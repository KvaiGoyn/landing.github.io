import { NextRequest, NextResponse } from 'next/server';
import { sendFormSubmissionToTelegram, detectFormType } from '@/app/utils/telegram';
import { sendFormEmail, EmailFormData } from '@/app/services/email';

/**
 * Маршрут для обработки форм с отправкой заявок
 * Отправляет email через SMTP Яндекс и уведомление в Telegram бота
 * Заменяет FormSubmit.co на собственную реализацию с Nodemailer
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
    
    // Отправляем email через SMTP Яндекс (в фоновом режиме, не блокируем ответ)
    try {
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
      
      const emailResult = await sendFormEmail(emailData);
      if (emailResult.success) {
        console.log('Email sent successfully:', emailResult.messageId);
      } else {
        console.warn('Failed to send email:', emailResult.error);
        // Не прерываем выполнение, только логируем
      }
    } catch (emailError) {
      // Логируем ошибку, но не прерываем выполнение
      console.warn('Failed to send email notification:', emailError);
    }
    
    // Отправляем уведомление в Telegram (в фоновом режиме, не блокируем ответ)
    try {
      await sendFormSubmissionToTelegram({
        name: formDataObject.name || 'Не указано',
        phone: formDataObject.phone || 'Не указано',
        email: formDataObject.email,
        message: formDataObject.message,
        formType,
        preferredTime: formDataObject.preferredTime,
        comment: formDataObject.comment,
        agree: formDataObject.agree,
        additionalFields: formDataObject,
      });
      console.log('Telegram notification sent successfully');
    } catch (telegramError) {
      // Логируем ошибку, но не прерываем выполнение
      console.warn('Failed to send Telegram notification:', telegramError);
    }
    
    // Определяем URL для редиректа
    const redirectUrl = formDataObject._next || '/thank-you';
    
    // Делаем редирект на страницу благодарности
    return NextResponse.redirect(new URL(redirectUrl, request.url), 302);
    
  } catch (error) {
    console.error('Proxy server error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Внутренняя ошибка сервера при обработке формы',
        error: error instanceof Error ? error.message : 'Unknown error'
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