/**
 * Утилиты для отправки уведомлений в Telegram бота
 */

export interface TelegramMessage {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  formType?: string;
  preferredTime?: string;
  comment?: string;
  agree?: string;
  additionalFields?: Record<string, string>;
}

/**
 * Форматирует данные формы в читаемое сообщение для Telegram
 */
export function formatTelegramMessage(data: TelegramMessage): string {
  const {
    name,
    phone,
    email,
    message,
    formType = 'Заявка',
    preferredTime,
    comment,
    additionalFields = {}
  } = data;

  let formattedMessage = `📋 *${formType}*\n\n`;
  formattedMessage += `👤 *Имя:* ${name}\n`;
  formattedMessage += `📞 *Телефон:* ${phone}\n`;
  
  if (email) {
    formattedMessage += `📧 *Email:* ${email}\n`;
  }
  
  if (message) {
    formattedMessage += `💬 *Сообщение:* ${message}\n`;
  }
  
  if (preferredTime) {
    formattedMessage += `⏰ *Удобное время:* ${preferredTime}\n`;
  }
  
  if (comment) {
    formattedMessage += `📝 *Комментарий:* ${comment}\n`;
  }
  
  // Добавляем дополнительные поля
  Object.entries(additionalFields).forEach(([key, value]) => {
    if (value && key !== 'name' && key !== 'phone' && key !== 'email' && key !== 'message' && key !== 'agree') {
      const formattedKey = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
      formattedMessage += `📌 *${formattedKey}:* ${value}\n`;
    }
  });
  
  formattedMessage += `\n🕒 *Время отправки:* ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}\n`;
  formattedMessage += `🌐 *Источник:* Лендинг Стиль Мастер`;
  
  return formattedMessage;
}

/**
 * Отправляет сообщение в Telegram через Bot API
 */
export async function sendTelegramNotification(
  message: string,
  options?: {
    parseMode?: 'Markdown' | 'HTML';
    disableNotification?: boolean;
  }
): Promise<boolean> {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    
    if (!botToken || !chatId) {
      console.warn('Telegram bot token or chat ID not configured. Skipping Telegram notification.');
      return false;
    }
    
    // Логирование для отладки (без полного токена)
    console.log(`Sending Telegram notification to chat ID: ${chatId.substring(0, 4)}...`);
    
    const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: options?.parseMode || 'Markdown',
        disable_notification: options?.disableNotification || false,
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Telegram API error:', errorData);
      return false;
    }
    
    console.log('Telegram notification sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending Telegram notification:', error);
    return false;
  }
}

/**
 * Отправляет уведомление о новой заявке в Telegram
 */
export async function sendFormSubmissionToTelegram(data: TelegramMessage): Promise<boolean> {
  try {
    const message = formatTelegramMessage(data);
    return await sendTelegramNotification(message);
  } catch (error) {
    console.error('Error preparing Telegram notification:', error);
    return false;
  }
}

/**
 * Определяет тип формы на основе полей данных
 */
export function detectFormType(data: Record<string, unknown>): string {
  if (data.formType) {
    return String(data.formType);
  }
  
  // Определяем по наличию специфичных полей
  if (data.preferredTime && !data.message) {
    return 'Обратный звонок';
  }
  
  if (data.message && data.email) {
    return 'Контактная форма';
  }
  
  if (data.calculationType || data.materialType) {
    return 'Расчёт стоимости';
  }
  
  if (data.measurementAddress || data.measurementDate) {
    return 'Заявка на замер';
  }
  
  if (data.projectType || data.projectSize) {
    return 'Детали проекта';
  }
  
  return 'Новая заявка';
}