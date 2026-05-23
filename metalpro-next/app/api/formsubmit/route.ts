import { NextRequest, NextResponse } from 'next/server';
import { 
  sendFormSubmissionToTelegram, 
  sendFormSubmissionToTelegramWithRetry,
  detectFormType 
} from '@/app/utils/telegram';
import { 
  sendFormEmail, 
  sendFormEmailWithRetry,
  EmailFormData 
} from '@/app/services/email';
import { 
  storeSubmission, 
  updateSubmission 
} from '@/app/services/storage';

/**
 * Получает базовый URL для редиректа на основе заголовков запроса.
 * Использует x-forwarded-proto и host для определения корректного домена продакшена.
 * Это предотвращает редирект на localhost при работе за reverse proxy.
 */
function getBaseUrl(request: NextRequest): string {
  // Пытаемся получить протокол из заголовка x-forwarded-proto (если за прокси)
  const proto = request.headers.get('x-forwarded-proto') || 'https';
  // Получаем хост из заголовка host (или из request.url)
  let host = request.headers.get('host');
  if (!host) {
    // Если host не передан, извлекаем из request.url
    try {
      const url = new URL(request.url);
      host = url.host;
    } catch {
      host = 'localhost:3000';
    }
  }
  // Убираем порт если стандартный (80, 443)
  if (host.includes(':80')) host = host.replace(':80', '');
  if (host.includes(':443')) host = host.replace(':443', '');
  return `${proto}://${host}`;
}

/**
 * Фоновая обработка заявки с retry механизмами и обновлением статуса
 */
async function processSubmissionInBackground(
  submissionId: string, 
  emailData: EmailFormData, 
  formType: string
): Promise<void> {
  console.log(`[Background] Starting processing for submission ${submissionId}`);
  
  // Обновляем статус на "processing"
  await updateSubmission(submissionId, { 
    status: 'processing',
    attempts: 1,
  });
  
  let emailSuccess = false;
  let telegramSuccess = false;
  const errors: string[] = [];
  
  // Параллельная отправка email и Telegram для скорости
  try {
    const [emailResult, telegramResult] = await Promise.allSettled([
      // Отправка email с retry
      sendFormEmailWithRetry(emailData, {
        maxRetries: 3,
        initialDelayMs: 5000,
        submissionId,
      }),
      // Отправка Telegram с retry
      sendFormSubmissionToTelegramWithRetry({
        name: emailData.name,
        phone: emailData.phone,
        email: emailData.email,
        message: emailData.message,
        formType,
        preferredTime: emailData.preferredTime,
        comment: emailData.comment,
        agree: emailData.agree,
        additionalFields: emailData.additionalFields,
      }, {
        maxRetries: 3,
        initialDelayMs: 3000,
        submissionId,
      }),
    ]);
    
    // Обработка результатов email
    if (emailResult.status === 'fulfilled') {
      emailSuccess = emailResult.value.success;
      if (!emailResult.value.success) {
        errors.push(`Email failed after ${emailResult.value.attempts} attempts: ${emailResult.value.error}`);
      }
    } else {
      errors.push(`Email promise rejected: ${emailResult.reason}`);
    }
    
    // Обработка результатов Telegram
    if (telegramResult.status === 'fulfilled') {
      telegramSuccess = telegramResult.value.success;
      if (!telegramResult.value.success) {
        errors.push(`Telegram failed after ${telegramResult.value.attempts} attempts`);
      }
    } else {
      errors.push(`Telegram promise rejected: ${telegramResult.reason}`);
    }
    
  } catch (error) {
    console.error(`[Background] Unexpected error processing submission ${submissionId}:`, error);
    errors.push(`Unexpected error: ${error instanceof Error ? error.message : 'Unknown'}`);
  }
  
  // Определяем финальный статус
  const finalStatus = (emailSuccess || telegramSuccess) ? 'sent' : 'failed';
  
  // Обновляем заявку в хранилище
  await updateSubmission(submissionId, {
    status: finalStatus,
    emailSent: emailSuccess,
    telegramSent: telegramSuccess,
    attempts: 1, // счетчик попыток на уровне заявки
    errors: errors.length > 0 ? errors : undefined,
  });
  
  console.log(`[Background] Processing completed for submission ${submissionId}:`, {
    status: finalStatus,
    emailSuccess,
    telegramSuccess,
    errorCount: errors.length,
  });
}

/**
 * Маршрут для обработки форм с отправкой заявок
 * Отправляет email через SMTP Яндекс и уведомление в Telegram бота
 * Заменяет FormSubmit.co на собственную реализацию с Nodemailer
 * Теперь с гарантированным сохранением заявок и retry механизмами
 */
export async function POST(request: NextRequest) {
  try {
    // Получаем данные из запроса
    const formData = await request.formData();
    
    // Преобразуем FormData в объект для Telegram
    const formDataObject: Record<string, string> = {};
    for (const [key, value] of formData.entries()) {
      if (typeof value === 'string') {
        formDataObject[key] = value;
      } else if (value instanceof File) {
        // Для файлов сохраняем только имя
        formDataObject[key] = value.name;
      }
    }
    
    // Определяем тип формы для Telegram и Email
    const formType = detectFormType(formDataObject);
    
    // Подготавливаем данные для email
    const emailData: EmailFormData = {
      name: formDataObject.name || 'Не указано',
      phone: formDataObject.phone || 'Не указано',
      email: formDataObject.email,
      message: formDataObject.message,
      formType,
      preferredTime: formDataObject.preferredTime,
      comment: formDataObject.comment,
      agree: formDataObject.agree,
      additionalFields: formDataObject,
    };
    
    // СОХРАНЯЕМ ЗАЯВКУ В ХРАНИЛИЩЕ (гарантия сохранения)
    const submission = await storeSubmission(emailData);
    console.log(`[API] Submission stored: ${submission.id}`);
    
    // Определяем URL для редиректа
    const redirectPath = formDataObject._next || '/thank-you';
    const baseUrl = getBaseUrl(request);
    const redirectUrl = new URL(redirectPath, baseUrl).toString();
    
    // ЗАПУСКАЕМ ФОНОВУЮ ОБРАБОТКУ С ГАРАНТИЯМИ
    // Используем IIFE с catch для предотвращения необработанных промисов
    (async () => {
      try {
        await processSubmissionInBackground(submission.id, emailData, formType);
      } catch (backgroundError) {
        console.error(`[API] Background processing failed for ${submission.id}:`, backgroundError);
        // Даже если фоновая обработка упала, заявка сохранена и может быть обработана позже
        await updateSubmission(submission.id, {
          status: 'failed',
          errors: [`Background processing error: ${backgroundError instanceof Error ? backgroundError.message : 'Unknown'}`],
        });
      }
    })().catch(error => {
      // Глобальный catch для фоновой задачи
      console.error('[API] Unhandled error in background task:', error);
    });
    
    // НЕМЕДЛЕННЫЙ редирект на страницу благодарности
    // Пользователь не ждет завершения отправки email/telegram
    // Заявка уже сохранена и будет обработана в фоне
    return NextResponse.redirect(redirectUrl, 302);
    
  } catch (error) {
    console.error('[API] Server error processing form:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Внутренняя ошибка сервера при обработке формы',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

/**
 * Обработка OPTIONS запросов для CORS
 */
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Accept',
    },
  });
}