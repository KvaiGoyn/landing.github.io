import { NextRequest, NextResponse } from 'next/server';
import { checkSmtpConfig } from '@/app/services/email';
import { getSubmissionStats, initializeStorage } from '@/app/services/storage';

/**
 * Health check endpoint для мониторинга состояния системы
 * Проверяет:
 * 1. Конфигурацию SMTP
 * 2. Состояние хранилища заявок
 * 3. Доступность внешних сервисов (опционально)
 * 4. Общую работоспособность API
 */
export async function GET(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // 1. Проверяем конфигурацию SMTP
    const smtpConfig = checkSmtpConfig();
    
    // 2. Инициализируем хранилище (если нужно) и получаем статистику
    await initializeStorage();
    const stats = await getSubmissionStats();
    
    // 3. Проверяем доступность Telegram (опционально, без реального запроса)
    const telegramConfigured = !!(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID);
    
    // 4. Проверяем общее состояние системы
    const isHealthy = smtpConfig.configured && telegramConfigured;
    const status = isHealthy ? 'healthy' : 'degraded';
    
    const responseTime = Date.now() - startTime;
    
    return NextResponse.json({
      status,
      timestamp: new Date().toISOString(),
      responseTimeMs: responseTime,
      services: {
        smtp: {
          configured: smtpConfig.configured,
          missing: smtpConfig.missing,
        },
        telegram: {
          configured: telegramConfigured,
          botTokenPresent: !!process.env.TELEGRAM_BOT_TOKEN,
          chatIdPresent: !!process.env.TELEGRAM_CHAT_ID,
        },
        storage: {
          initialized: true,
          directory: 'data/submissions',
        },
      },
      submissions: stats,
      system: {
        nodeEnv: process.env.NODE_ENV || 'development',
        nextExport: process.env.NEXT_EXPORT || 'false',
        basePath: process.env.NEXT_PUBLIC_BASE_PATH || 'none',
      },
      warnings: !isHealthy ? [
        ...(smtpConfig.missing.length > 0 ? [`SMTP missing: ${smtpConfig.missing.join(', ')}`] : []),
        ...(!telegramConfigured ? ['Telegram not configured'] : []),
      ] : [],
    }, {
      status: isHealthy ? 200 : 503,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'X-Health-Check': 'true',
      },
    });
    
  } catch (error) {
    const responseTime = Date.now() - startTime;
    
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      responseTimeMs: responseTime,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: process.env.NODE_ENV === 'development' && error instanceof Error ? error.stack : undefined,
      services: {
        smtp: { configured: false, missing: ['SMTP_USER', 'SMTP_PASS'] },
        telegram: { configured: false },
        storage: { initialized: false },
      },
      submissions: {
        total: 0,
        pending: 0,
        sent: 0,
        failed: 0,
        processing: 0,
      },
    }, {
      status: 503,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'X-Health-Check': 'true',
      },
    });
  }
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