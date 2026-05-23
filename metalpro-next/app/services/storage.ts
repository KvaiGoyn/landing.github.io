import fs from 'fs/promises';
import path from 'path';
import { EmailFormData } from './email';

export interface StoredSubmission {
  id: string;
  timestamp: string;
  data: EmailFormData;
  status: 'pending' | 'processing' | 'sent' | 'failed';
  attempts: number;
  emailSent: boolean;
  telegramSent: boolean;
  lastAttempt?: string;
  errors?: string[];
}

const STORAGE_DIR = path.join(process.cwd(), 'data', 'submissions');
const MAX_RETENTION_DAYS = 30;

/**
 * Инициализирует директорию для хранения заявок
 */
async function ensureStorageDir(): Promise<void> {
  try {
    await fs.mkdir(STORAGE_DIR, { recursive: true });
  } catch (error) {
    console.error('[Storage] Failed to create storage directory:', error);
  }
}

/**
 * Генерирует уникальный ID для заявки
 */
function generateSubmissionId(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 10);
  return `sub_${timestamp}_${random}`;
}

/**
 * Сохраняет заявку в хранилище
 */
export async function storeSubmission(data: EmailFormData): Promise<StoredSubmission> {
  await ensureStorageDir();
  
  const submission: StoredSubmission = {
    id: generateSubmissionId(),
    timestamp: new Date().toISOString(),
    data,
    status: 'pending',
    attempts: 0,
    emailSent: false,
    telegramSent: false,
  };
  
  const filePath = path.join(STORAGE_DIR, `${submission.id}.json`);
  await fs.writeFile(filePath, JSON.stringify(submission, null, 2));
  
  console.log(`[Storage] Submission stored: ${submission.id}`);
  return submission;
}

/**
 * Обновляет статус заявки
 */
export async function updateSubmission(
  submissionId: string, 
  updates: Partial<StoredSubmission>
): Promise<StoredSubmission | null> {
  try {
    const filePath = path.join(STORAGE_DIR, `${submissionId}.json`);
    const content = await fs.readFile(filePath, 'utf-8');
    const submission: StoredSubmission = JSON.parse(content);
    
    const updatedSubmission = {
      ...submission,
      ...updates,
      lastAttempt: new Date().toISOString(),
    };
    
    await fs.writeFile(filePath, JSON.stringify(updatedSubmission, null, 2));
    return updatedSubmission;
  } catch (error) {
    console.error(`[Storage] Failed to update submission ${submissionId}:`, error);
    return null;
  }
}

/**
 * Получает заявку по ID
 */
export async function getSubmission(submissionId: string): Promise<StoredSubmission | null> {
  try {
    const filePath = path.join(STORAGE_DIR, `${submissionId}.json`);
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`[Storage] Failed to get submission ${submissionId}:`, error);
    return null;
  }
}

/**
 * Получает все заявки с фильтрацией по статусу
 */
export async function getAllSubmissions(options?: {
  status?: StoredSubmission['status'];
  limit?: number;
}): Promise<StoredSubmission[]> {
  await ensureStorageDir();
  
  try {
    const files = await fs.readdir(STORAGE_DIR);
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    
    const submissions: StoredSubmission[] = [];
    
    for (const file of jsonFiles.slice(0, options?.limit || 100)) {
      try {
        const content = await fs.readFile(path.join(STORAGE_DIR, file), 'utf-8');
        const submission = JSON.parse(content);
        
        if (!options?.status || submission.status === options.status) {
          submissions.push(submission);
        }
      } catch (error) {
        console.warn(`[Storage] Failed to read submission file ${file}:`, error);
      }
    }
    
    // Сортируем по времени (новые сначала)
    return submissions.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  } catch (error) {
    console.error('[Storage] Failed to read submissions directory:', error);
    return [];
  }
}

/**
 * Получает статистику по заявкам
 */
export async function getSubmissionStats(): Promise<{
  total: number;
  pending: number;
  sent: number;
  failed: number;
  processing: number;
}> {
  const all = await getAllSubmissions();
  
  return {
    total: all.length,
    pending: all.filter(s => s.status === 'pending').length,
    processing: all.filter(s => s.status === 'processing').length,
    sent: all.filter(s => s.status === 'sent').length,
    failed: all.filter(s => s.status === 'failed').length,
  };
}

/**
 * Очищает старые заявки (старше MAX_RETENTION_DAYS)
 */
export async function cleanupOldSubmissions(): Promise<number> {
  try {
    const files = await fs.readdir(STORAGE_DIR);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - MAX_RETENTION_DAYS);
    
    let deletedCount = 0;
    
    for (const file of files) {
      if (!file.endsWith('.json')) continue;
      
      try {
        const content = await fs.readFile(path.join(STORAGE_DIR, file), 'utf-8');
        const submission = JSON.parse(content);
        const submissionDate = new Date(submission.timestamp);
        
        if (submissionDate < cutoffDate && submission.status === 'sent') {
          await fs.unlink(path.join(STORAGE_DIR, file));
          deletedCount++;
        }
      } catch (error) {
        console.warn(`[Storage] Failed to process file ${file} for cleanup:`, error);
      }
    }
    
    console.log(`[Storage] Cleaned up ${deletedCount} old submissions`);
    return deletedCount;
  } catch (error) {
    console.error('[Storage] Cleanup failed:', error);
    return 0;
  }
}

/**
 * Инициализирует хранилище при запуске
 */
export async function initializeStorage(): Promise<void> {
  await ensureStorageDir();
  console.log('[Storage] Initialized');
}