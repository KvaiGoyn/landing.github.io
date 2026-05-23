import { NextRequest, NextResponse } from 'next/server';
import { getAllSubmissions, getSubmissionStats } from '@/app/services/storage';

/**
 * API endpoint для админ-панели
 * Требует аутентификации через простой токен
 */
export async function GET(request: NextRequest) {
  // Простая аутентификация через query parameter или header
  const authToken = request.headers.get('X-Admin-Token') || 
                   new URL(request.url).searchParams.get('token');
  
  const expectedToken = process.env.ADMIN_TOKEN || 'dev-admin-token';
  
  if (!authToken || authToken !== expectedToken) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');
    const page = parseInt(searchParams.get('page') || '1');
    
    // Получаем все заявки с фильтрацией
    const allSubmissions = await getAllSubmissions({
      status: status as any,
    });
    
    // Пагинация
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedSubmissions = allSubmissions.slice(startIndex, endIndex);
    
    // Получаем статистику
    const stats = await getSubmissionStats();
    
    return NextResponse.json({
      success: true,
      data: {
        submissions: paginatedSubmissions,
        pagination: {
          page,
          limit,
          total: allSubmissions.length,
          totalPages: Math.ceil(allSubmissions.length / limit),
        },
        stats,
      },
      timestamp: new Date().toISOString(),
    });
    
  } catch (error) {
    console.error('[Admin API] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * Ручное обновление статуса заявки
 */
export async function POST(request: NextRequest) {
  try {
    const authToken = request.headers.get('X-Admin-Token');
    const expectedToken = process.env.ADMIN_TOKEN || 'dev-admin-token';
    
    if (!authToken || authToken !== expectedToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    const { submissionId, action } = body;
    
    if (!submissionId || !action) {
      return NextResponse.json(
        { error: 'Missing submissionId or action' },
        { status: 400 }
      );
    }
    
    const { updateSubmission } = await import('@/app/services/storage');
    
    switch (action) {
      case 'retry':
        // Здесь можно добавить логику повторной отправки
        const updated = await updateSubmission(submissionId, {
          status: 'pending',
          attempts: 0,
        });
        return NextResponse.json({
          success: true,
          message: 'Submission marked for retry',
          submission: updated,
        });
        
      case 'delete':
        // В реальной реализации нужно удалить файл
        return NextResponse.json({
          success: true,
          message: 'Delete functionality not implemented yet',
        });
        
      default:
        return NextResponse.json(
          { error: 'Unknown action' },
          { status: 400 }
        );
    }
    
  } catch (error) {
    console.error('[Admin API] POST error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}