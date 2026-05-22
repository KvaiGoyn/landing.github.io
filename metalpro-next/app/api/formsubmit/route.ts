import { NextRequest, NextResponse } from 'next/server';

/**
 * Прокси-маршрут для отправки форм на FormSubmit.co
 * Решает проблему CORS, отправляя запросы через серверную часть
 */
export async function POST(request: NextRequest) {
  try {
    // Получаем данные из запроса
    const formData = await request.formData();
    
    // Получаем email получателя из переменной окружения или используем дефолтный
    const recipientEmail = process.env.FORM_SUBMIT_RECIPIENT_EMAIL || 'nezabut123@gmail.com';
    
    // Создаем новый FormData для отправки на FormSubmit
    const formDataToSend = new FormData();
    
    // Копируем все поля из исходного FormData
    for (const [key, value] of formData.entries()) {
      formDataToSend.append(key, value);
    }
    
    // Добавляем обязательные скрытые поля, если их нет
    if (!formDataToSend.has('_subject')) {
      formDataToSend.append('_subject', 'Заявка с лендинга Стиль Мастер');
    }
    if (!formDataToSend.has('_captcha')) {
      formDataToSend.append('_captcha', 'false');
    }
    if (!formDataToSend.has('_template')) {
      formDataToSend.append('_template', 'table');
    }
    
    // Отправляем запрос на FormSubmit
    const response = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
      method: 'POST',
      body: formDataToSend,
      headers: {
        'Accept': 'application/json',
      },
    });
    
    // Проверяем статус ответа
    if (!response.ok) {
      const errorText = await response.text();
      console.error('FormSubmit error:', errorText);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Ошибка при отправке формы на сервер FormSubmit',
          error: errorText 
        },
        { status: response.status }
      );
    }
    
    // Парсим JSON ответ от FormSubmit
    const data = await response.json();
    
    // Возвращаем успешный ответ
    return NextResponse.json({
      success: true,
      message: 'Форма успешно отправлена',
      data,
    });
    
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