/**
 * Базовый API клиент для отправки HTTP запросов
 */

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface ApiError {
  message: string;
  status?: number;
  errors?: Record<string, string[]>;
}

/**
 * Базовый HTTP клиент
 */
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = '') {
    this.baseURL = baseURL;
  }

  /**
   * Отправка запроса
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw {
          message: data.message || 'Произошла ошибка при выполнении запроса',
          status: response.status,
          errors: data.errors,
        } as ApiError;
      }

      return {
        success: true,
        data: data.data || data,
        message: data.message,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Сетевая ошибка',
        errors: error.errors,
      };
    }
  }

  /**
   * GET запрос
   */
  async get<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'GET',
    });
  }

  /**
   * POST запрос
   */
  async post<T>(endpoint: string, data?: any, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * PUT запрос
   */
  async put<T>(endpoint: string, data?: any, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * DELETE запрос
   */
  async delete<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'DELETE',
    });
  }
}

/**
 * Моковый API клиент для разработки
 */
class MockApiClient {
  private delay(ms: number = 500): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    await this.delay(800); // Имитация задержки сети
    
    // Генерация случайного успеха/ошибки для тестирования
    const isSuccess = Math.random() > 0.2; // 80% успешных запросов
    
    if (!isSuccess) {
      return {
        success: false,
        message: 'Сервер временно недоступен. Пожалуйста, попробуйте позже.',
      };
    }

    return {
      success: true,
      data: { id: Date.now(), ...data } as any,
      message: 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.',
    };
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    await this.delay(300);
    
    return {
      success: true,
      data: {} as any,
    };
  }
}

// Определяем, использовать ли моковый API
const USE_MOCK_API = process.env.NODE_ENV === 'development' && true; // Временно всегда используем мок для разработки

// Создаем экземпляр клиента
export const api = USE_MOCK_API ? new MockApiClient() : new ApiClient('/api');

// Экспортируем типы для удобства
// ApiError уже экспортирован выше