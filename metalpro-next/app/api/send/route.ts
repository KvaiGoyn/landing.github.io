import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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
    const body = await request.formData();

    const name = body.get('name') as string || '';
    const phone = body.get('phone') as string || '';
    const email = body.get('email') as string || '';
    const message = body.get('message') as string || '';
    const formType = body.get('formType') as string || 'Заявка с лендинга';
    const subject = body.get('_subject') as string || `Новая заявка: ${formType}`;

    const html = `
      <h2>${subject}</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px;">
        <tr>
          <td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5;">Тип формы</td>
          <td style="padding:8px 12px;border:1px solid #ddd;">${formType}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5;">Имя</td>
          <td style="padding:8px 12px;border:1px solid #ddd;">${name}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5;">Телефон</td>
          <td style="padding:8px 12px;border:1px solid #ddd;">${phone}</td>
        </tr>
        ${email ? `<tr>
          <td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5;">Email</td>
          <td style="padding:8px 12px;border:1px solid #ddd;">${email}</td>
        </tr>` : ''}
        ${message ? `<tr>
          <td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;background:#f5f5f5;">Сообщение</td>
          <td style="padding:8px 12px;border:1px solid #ddd;">${message}</td>
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
    });

    return NextResponse.redirect(new URL('/thank-you', request.url));
  } catch (error) {
    console.error('SMTP send error:', error);
    return NextResponse.json(
      { error: 'Ошибка при отправке сообщения' },
      { status: 500 }
    );
  }
}