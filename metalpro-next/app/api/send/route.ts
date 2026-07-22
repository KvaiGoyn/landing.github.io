import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const MAX_BODY_SIZE = 16_384;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const allowedFormTypes = new Set([
  'callback',
  'calculation',
  'consultation',
  'order',
  'measurement',
  'contact',
  'project-details',
  'Заявка с лендинга',
]);
const requestLog = new Map<string, number[]>();

const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, (character) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  "'": '&#39;',
  '"': '&quot;',
})[character] ?? character);

const readTextField = (body: FormData, name: string, maxLength: number) => {
  const value = body.get(name);
  if (typeof value !== 'string') return null;
  const normalized = value.trim();
  return normalized.length <= maxLength ? normalized : null;
};

const isRateLimited = (request: NextRequest) => {
  const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0].trim()
    || request.headers.get('x-real-ip')
    || 'unknown';
  const now = Date.now();
  const recentRequests = (requestLog.get(clientIp) || []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );

  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(clientIp, recentRequests);
    return true;
  }

  recentRequests.push(now);
  requestLog.set(clientIp, recentRequests);
  return false;
};

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.yandex.ru',
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('multipart/form-data') && !contentType.includes('application/x-www-form-urlencoded')) {
      return NextResponse.json({ error: 'Неподдерживаемый формат запроса' }, { status: 415 });
    }

    const contentLength = Number(request.headers.get('content-length') || 0);
    if (contentLength > MAX_BODY_SIZE) {
      return NextResponse.json({ error: 'Запрос слишком большой' }, { status: 413 });
    }

    if (isRateLimited(request)) {
      return NextResponse.json(
        { error: 'Слишком много заявок. Попробуйте позже' },
        { status: 429, headers: { 'Retry-After': '600' } },
      );
    }

    const body = await request.formData();

    const name = readTextField(body, 'name', 100);
    const phone = readTextField(body, 'phone', 30);
    const email = readTextField(body, 'email', 254) || '';
    const message = readTextField(body, 'message', 3000) || '';
    const requestedFormType = readTextField(body, 'formType', 50) || 'Заявка с лендинга';
    const service = readTextField(body, 'service', 100) || '';
    const website = readTextField(body, 'website', 200) || '';
    const agree = readTextField(body, 'agree', 10);
    const formType = allowedFormTypes.has(requestedFormType) ? requestedFormType : 'Заявка с лендинга';
    const subject = `Новая заявка: ${formType}`;

    if (website) {
      return new NextResponse(null, { status: 303, headers: { Location: '/thank-you/' } });
    }

    if (!name || !phone || agree !== 'yes' || (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
      return NextResponse.json({ error: 'Проверьте обязательные поля заявки' }, { status: 422 });
    }

    const safe = {
      name: escapeHtml(name),
      phone: escapeHtml(phone),
      email: escapeHtml(email),
      message: escapeHtml(message).replace(/\n/g, '<br>'),
      formType: escapeHtml(formType),
      service: escapeHtml(service),
      subject: escapeHtml(subject),
    };

    const html = `
      <h2>${safe.subject}</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px;">
        <tr>
          <td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5;">Тип формы</td>
          <td style="padding:8px 12px;border:1px solid #ddd;">${safe.formType}</td>
        </tr>
        ${service ? `<tr>
          <td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5;">Услуга</td>
          <td style="padding:8px 12px;border:1px solid #ddd;">${safe.service}</td>
        </tr>` : ''}
        <tr>
          <td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5;">Имя</td>
          <td style="padding:8px 12px;border:1px solid #ddd;">${safe.name}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5;">Телефон</td>
          <td style="padding:8px 12px;border:1px solid #ddd;">${safe.phone}</td>
        </tr>
        ${email ? `<tr>
          <td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5;">Email</td>
          <td style="padding:8px 12px;border:1px solid #ddd;">${safe.email}</td>
        </tr>` : ''}
        ${message ? `<tr>
          <td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5;">Сообщение</td>
          <td style="padding:8px 12px;border:1px solid #ddd;">${safe.message}</td>
        </tr>` : ''}
      </table>
      <p style="color:#888;font-size:12px;margin-top:16px;">
        Отправлено с сайта stylmaster.ru
      </p>
    `;

    await transporter.sendMail({
      from: `"Стиль Мастер" <${process.env.SMTP_USER}>`,
      to: process.env.EMAIL_RECIPIENT || 'nezabut123@gmail.com',
      subject,
      html,
      text: [
        subject,
        `Тип формы: ${formType}`,
        service && `Услуга: ${service}`,
        `Имя: ${name}`,
        `Телефон: ${phone}`,
        email && `Email: ${email}`,
        message && `Сообщение: ${message}`,
      ].filter(Boolean).join('\n'),
    });

    return new NextResponse(null, {
      status: 303,
      headers: { Location: '/thank-you/' },
    });
  } catch (error) {
    console.error('SMTP send error:', error);
    return NextResponse.json(
      { error: 'Ошибка при отправке сообщения' },
      { status: 500 }
    );
  }
}
