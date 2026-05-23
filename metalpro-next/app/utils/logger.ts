/**
 * Структурированный логгер для приложения
 * Обеспечивает консистентное логирование с метаданными
 */

export interface LogEntry {
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  timestamp: string;
  service?: string;
  submissionId?: string;
  durationMs?: number;
  attempts?: number;
  data?: Record<string, unknown>;
  error?: string;
  stack?: string;
}

export interface LoggerOptions {
  service?: string;
  submissionId?: string;
  enableConsole?: boolean;
  enableFileLog?: boolean;
}

export class StructuredLogger {
  private service: string;
  private submissionId?: string;
  private enableConsole: boolean;
  private enableFileLog: boolean;

  constructor(options: LoggerOptions = {}) {
    this.service = options.service || 'app';
    this.submissionId = options.submissionId;
    this.enableConsole = options.enableConsole ?? true;
    this.enableFileLog = options.enableFileLog ?? false;
  }

  private createEntry(level: LogEntry['level'], message: string, data?: Record<string, unknown>): LogEntry {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      service: this.service,
      submissionId: this.submissionId,
      ...(data && { data }),
    };
  }

  private output(entry: LogEntry): void {
    if (this.enableConsole) {
      const consoleMethod = console[entry.level] || console.log;
      const prefix = `[${entry.timestamp}] [${entry.level.toUpperCase()}] [${entry.service}]`;
      const submissionPrefix = entry.submissionId ? `[${entry.submissionId}]` : '';
      
      consoleMethod(`${prefix}${submissionPrefix} ${entry.message}`);
      
      if (entry.data) {
        consoleMethod('Data:', entry.data);
      }
      
      if (entry.error) {
        consoleMethod('Error:', entry.error);
      }
      
      if (entry.durationMs !== undefined) {
        consoleMethod(`Duration: ${entry.durationMs}ms`);
      }
    }

    // В будущем можно добавить запись в файл или отправку в внешнюю систему
    if (this.enableFileLog) {
      // Реализация записи в файл
    }
  }

  info(message: string, data?: Record<string, unknown>): void {
    const entry = this.createEntry('info', message, data);
    this.output(entry);
  }

  warn(message: string, data?: Record<string, unknown>): void {
    const entry = this.createEntry('warn', message, data);
    this.output(entry);
  }

  error(message: string, error?: Error | string, data?: Record<string, unknown>): void {
    const entry = this.createEntry('error', message, data);
    
    if (error) {
      if (error instanceof Error) {
        entry.error = error.message;
        entry.stack = error.stack;
      } else {
        entry.error = error;
      }
    }
    
    this.output(entry);
  }

  debug(message: string, data?: Record<string, unknown>): void {
    if (process.env.NODE_ENV === 'development') {
      const entry = this.createEntry('debug', message, data);
      this.output(entry);
    }
  }

  withSubmission(submissionId: string): StructuredLogger {
    return new StructuredLogger({
      service: this.service,
      submissionId,
      enableConsole: this.enableConsole,
      enableFileLog: this.enableFileLog,
    });
  }

  withService(service: string): StructuredLogger {
    return new StructuredLogger({
      service,
      submissionId: this.submissionId,
      enableConsole: this.enableConsole,
      enableFileLog: this.enableFileLog,
    });
  }

  /**
   * Логирование с измерением времени выполнения
   */
  async time<T>(
    operation: string,
    fn: () => Promise<T> | T,
    data?: Record<string, unknown>
  ): Promise<T> {
    const startTime = Date.now();
    
    try {
      const result = await fn();
      const durationMs = Date.now() - startTime;
      
      this.info(`${operation} completed`, {
        ...data,
        durationMs,
        success: true,
      });
      
      return result;
    } catch (error) {
      const durationMs = Date.now() - startTime;
      
      this.error(`${operation} failed`, error instanceof Error ? error : undefined, {
        ...data,
        durationMs,
        success: false,
      });
      
      throw error;
    }
  }
}

// Экспорт глобального логгера по умолчанию
export const logger = new StructuredLogger({ service: 'app' });

// Специализированные логгеры для сервисов
export const emailLogger = logger.withService('email');
export const telegramLogger = logger.withService('telegram');
export const storageLogger = logger.withService('storage');
export const apiLogger = logger.withService('api');

/**
 * Быстрые функции для общего использования
 */
export function logInfo(message: string, data?: Record<string, unknown>): void {
  logger.info(message, data);
}

export function logWarn(message: string, data?: Record<string, unknown>): void {
  logger.warn(message, data);
}

export function logError(message: string, error?: Error | string, data?: Record<string, unknown>): void {
  logger.error(message, error, data);
}

export function logDebug(message: string, data?: Record<string, unknown>): void {
  logger.debug(message, data);
}