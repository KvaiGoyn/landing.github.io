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
    
    // Определяем URL для редиректа (делаем это до асинхронных операций)
    const redirectUrl = formDataObject._next || '/thank-you';
    
    // АСИНХРОННАЯ отправка email и Telegram (не блокируем ответ пользователю)
    // Запускаем в фоне, не ждем завершения
    (async () => {
      try {
        // Отправляем email через SMTP Яндекс
        const emailResult = await sendFormEmail(emailData);
        if (emailResult.success) {
          console.log('Email sent successfully:', emailResult.messageId);
        } else {
          console.warn('Failed to send email:', emailResult.error);
        }
      } catch (emailError) {
        console.warn('Failed to send email notification:', emailError);
      }
      
      try {
        // Отправляем уведомление в Telegram
        await sendFormSubmissionToTelegram({
          name: emailData.name,
          phone: emailData.phone,
          email: emailData.email,
          message: emailData.message,
          formType,
          preferredTime: emailData.preferredTime,
          comment: emailData.comment,
          agree: emailData.agree,
          additionalFields: emailData.additionalFields,
        });
        console.log('Telegram notification sent successfully');
      } catch (telegramError) {
        console.warn('Failed to send Telegram notification:', telegramError);
      }
    })().catch(error => {
      // Глобальный catch для фоновой задачи
      console.error('Background task error:', error);
    });
    
    // НЕМЕДЛЕННЫЙ редирект на страницу благодарности
    // Пользователь не ждет завершения отправки email/telegram
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