import { NextRequest, NextResponse } from 'next/server';
import { checkSmtpConfig } from '@/app/services/email';
import { getSubmissionStats } from '@/app/services/storage';

/**
 * Health check endpoint для мониторинга состояния системы
 *
 * ВАЖНО: Всегда возвращает 200 OK, если сервер запущен и отвечает на запросы.
 * Статусы внешних сервисов (SMTP, Telegram) передаются только в теле ответа
 * и НЕ влияют на HTTP статус, чтобы не блокировать деплой и оркестрацию.
 *
 * Для детальной диагностики используйте POST /api/health с токеном авторизации.
 */
export async function GET(request: NextRequest) {
  const startTime = Date.now();

  // Собираем информацию о сервисах без влияния на HTTP статус
  const smtpConfigured = !!(process.env.SMTP_USER && process.env.SMTP_PASS);
  const telegramConfigured = !!(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID);

  const responseTime = Date.now() - startTime;

  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    responseTimeMs: responseTime,
    services: {
      smtp: {
        configured: smtpConfigured,
      },
      telegram: {
        configured: telegramConfigured,
      },
    },
    system: {
      nodeEnv: process.env.NODE_ENV || 'development',
    },
  }, {
    status: 200,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'X-Health-Check': 'true',
    },
  });
}

/**
 * Подробная диагностика системы (только для админов)
 */
export async function POST(request: NextRequest) {
  // Проверяем секретный ключ для доступа к расширенной диагностике
  const authHeader = request.headers.get('Authorization');
  const expectedToken = process.env.HEALTH_CHECK_TOKEN;
  
  if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  try {
    // Получаем детальную информацию о системе
    const [smtpConfig, stats] = await Promise.all([
      checkSmtpConfig(),
      getSubmissionStats(),
    ]);
    
    // Получаем последние заявки для диагностики
    const { getAllSubmissions } = await import('@/app/services/storage');
    const recentSubmissions = await getAllSubmissions({ limit: 10 });
    
    return NextResponse.json({
      status: 'diagnostic',
      timestamp: new Date().toISOString(),
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        NEXT_EXPORT: process.env.NEXT_EXPORT,
        NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH,
        SMTP_HOST: process.env.SMTP_HOST ? '***' : 'not set',
        SMTP_PORT: process.env.SMTP_PORT,
        SMTP_USER: process.env.SMTP_USER ? '***' : 'not set',
        TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN ? '***' : 'not set',
        TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID ? '***' : 'not set',
      },
      services: {
        smtp: smtpConfig,
        storage: {
          stats,
          recentCount: recentSubmissions.length,
        },
      },
      recentSubmissions: recentSubmissions.map(sub => ({
        id: sub.id,
        timestamp: sub.timestamp,
        status: sub.status,
        formType: sub.data.formType,
        emailSent: sub.emailSent,
        telegramSent: sub.telegramSent,
        attempts: sub.attempts,
      })),
      recommendations: [
        ...(smtpConfig.missing.length > 0 ? [`Configure SMTP: ${smtpConfig.missing.join(', ')}`] : []),
        ...(stats.failed > 0 ? [`Check ${stats.failed} failed submissions`] : []),
        ...(stats.pending > 0 ? [`${stats.pending} submissions pending processing`] : []),
      ],
    });
    
  } catch (error) {
    return NextResponse.json({
      status: 'diagnostic_error',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}