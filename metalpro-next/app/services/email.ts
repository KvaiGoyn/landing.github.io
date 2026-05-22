import nodemailer from 'nodemailer';

export interface EmailFormData {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  formType: string;
  preferredTime?: string;
  comment?: string;
  agree?: string;
  additionalFields?: Record<string, string>;
}

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

/**
 * Создает транспортер для SMTP Яндекса с несколькими попытками конфигурации
 */
function createTransporter() {
  // Проверяем, включена ли отправка через SMTP
  const enableSmtp = process.env.ENABLE_SMTP !== 'false'; // по умолчанию true
  if (!enableSmtp) {
    throw new Error('SMTP отправка отключена (ENABLE_SMTP=false)');
  }

  const host = process.env.SMTP_HOST || 'smtp.yandex.ru';
  const port = parseInt(process.env.SMTP_PORT || '465'); // По умолчанию порт 465 (SSL)
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || user;

  if (!user || !pass) {
    throw new Error('SMTP credentials are not configured. Please set SMTP_USER and SMTP_PASS environment variables.');
  }

  console.log(`[SMTP] Creating transporter for ${user}@${host}:${port}`);

  // Оптимизированная конфигурация для продакшена с агрессивными таймаутами
  const config = {
    host,
    port,
    secure: port === 465, // true для порта 465, false для 587
    auth: { user, pass },
    tls: {
      rejectUnauthorized: false // Игнорировать ошибки самоподписанных сертификатов
    },
    // АГРЕССИВНЫЕ таймауты для продакшена (быстрый отказ)
    connectionTimeout: 5000,  // 5 секунд на установку соединения
    greetingTimeout: 5000,    // 5 секунд на приветствие сервера
    socketTimeout: 10000,     // 10 секунд на неактивность сокета
    // Дополнительные настройки для надежности
    logger: false,
    debug: false,
    // Имя для HELO/EHLO (важно для Яндекс)
    name: 'smtp.yandex.ru',
    // Отключаем пул соединений для однократной отправки
    pool: false,
    maxConnections: 1,
    maxMessages: 1
  };

  console.log(`[SMTP] Configuration: ${host}:${port}, secure: ${config.secure}, timeouts: ${config.connectionTimeout}ms`);

  return nodemailer.createTransport(config);
}

/**
 * Формирует HTML-письмо на основе данных формы
 */
export function formatFormEmail(data: EmailFormData): EmailOptions {
  const recipient = process.env.EMAIL_RECIPIENT || process.env.FORM_SUBMIT_RECIPIENT_EMAIL || 'nezabut123@gmail.com';
  const formTypeMap: Record<string, string> = {
    callback: 'Обратный звонок',
    contact: 'Контактная форма',
    consultation: 'Консультация',
    calculation: 'Расчет стоимости',
    measurement: 'Замер',
    default: 'Заявка с сайта',
  };

  const formTypeName = formTypeMap[data.formType] || formTypeMap.default;
  const subject = `Заявка с лендинга Стиль Мастер: ${formTypeName}`;

  const fields = [
    { label: 'Имя', value: data.name },
    { label: 'Телефон', value: data.phone },
    { label: 'Email', value: data.email || 'Не указан' },
    { label: 'Сообщение', value: data.message || 'Не указано' },
    { label: 'Удобное время', value: data.preferredTime || 'Не указано' },
    { label: 'Комментарий', value: data.comment || 'Не указано' },
    { label: 'Согласие на обработку', value: data.agree === 'on' ? 'Да' : 'Нет' },
  ];

  // Добавляем дополнительные поля
  if (data.additionalFields) {
    Object.entries(data.additionalFields).forEach(([key, value]) => {
      if (!['name', 'phone', 'email', 'message', 'preferredTime', 'comment', 'agree', '_subject', '_captcha', '_template', '_next'].includes(key)) {
        fields.push({ label: key, value });
      }
    });
  }

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
    .header { background-color: #f8f9fa; padding: 15px; border-radius: 5px 5px 0 0; margin-bottom: 20px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #555; }
    .value { padding: 8px; background-color: #f9f9f9; border-radius: 3px; margin-top: 5px; }
    .footer { margin-top: 30px; padding-top: 15px; border-top: 1px solid #eee; font-size: 12px; color: #777; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Новая заявка с сайта</h2>
      <p><strong>Тип формы:</strong> ${formTypeName}</p>
      <p><strong>Время получения:</strong> ${new Date().toLocaleString('ru-RU')}</p>
    </div>
    
    <h3>Данные клиента:</h3>
    ${fields.map(field => `
      <div class="field">
        <div class="label">${field.label}:</div>
        <div class="value">${field.value || 'Не указано'}</div>
      </div>
    `).join('')}
    
    <div class="footer">
      <p>Это письмо было отправлено автоматически с лендинга "Стиль Мастер".</p>
      <p>Не отвечайте на это письмо. Для связи с клиентом используйте указанные контактные данные.</p>
    </div>
  </div>
</body>
</html>
  `.trim();

  const text = fields.map(f => `${f.label}: ${f.value}`).join('\n');

  return {
    to: recipient,
    subject,
    html,
    text,
  };
}

/**
 * Отправляет email с данными формы
 */
export async function sendFormEmail(data: EmailFormData): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const transporter = createTransporter();
    const emailOptions = formatFormEmail(data);
    const from = process.env.SMTP_FROM || process.env.SMTP_USER;

    const info = await transporter.sendMail({
      from: `"Стиль Мастер" <${from}>`,
      to: emailOptions.to,
      subject: emailOptions.subject,
      html: emailOptions.html,
      text: emailOptions.text,
    });

    console.log('Email sent successfully:', info.messageId);
    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error('Failed to send email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Проверяет конфигурацию SMTP
 */
export function checkSmtpConfig(): { configured: boolean; missing: string[] } {
  const required = ['SMTP_USER', 'SMTP_PASS'];
  const missing = required.filter(key => !process.env[key]);

  return {
    configured: missing.length === 0,
    missing,
  };
}