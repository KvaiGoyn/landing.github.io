/**
 * Сервис для отправки форм
 */

import { api, ApiResponse } from './api';

/**
 * Типы данных для форм
 */

export interface ContactFormData {
  name: string;
  phone: string;
  email?: string;
  message: string;
  source?: string;
}

export interface CallbackFormData {
  name: string;
  phone: string;
  preferredTime?: string;
  comment?: string;
}

export interface ConsultationFormData {
  name: string;
  phone: string;
  service: string;
  details?: string;
}

export interface CalculationFormData {
  serviceType: string;
  dimensions?: {
    width?: number;
    height?: number;
    length?: number;
  };
  material?: string;
  color?: string;
  quantity?: number;
  name: string;
  phone: string;
  email?: string;
}

export interface MeasurementFormData {
  address: string;
  convenientTime: string;
  date?: string;
  name: string;
  phone: string;
  comment?: string;
}

export interface OrderFormData {
  service: string;
  name: string;
  phone: string;
  email?: string;
  deadline?: string;
  budget?: string;
  details?: string;
}

/**
 * Ответы API
 */
export interface FormSubmissionResponse {
  id: number;
  message: string;
  timestamp: string;
}

/**
 * Функции отправки форм
 */

/**
 * Отправка контактной формы
 */
export async function sendContactForm(data: ContactFormData): Promise<ApiResponse<FormSubmissionResponse>> {
  return api.post<FormSubmissionResponse>('/contact', {
    ...data,
    source: 'contact-page',
    timestamp: new Date().toISOString(),
  });
}

/**
 * Отправка формы обратного звонка
 */
export async function sendCallbackForm(data: CallbackFormData): Promise<ApiResponse<FormSubmissionResponse>> {
  return api.post<FormSubmissionResponse>('/callback', {
    ...data,
    source: 'callback-form',
    timestamp: new Date().toISOString(),
  });
}

/**
 * Отправка формы консультации
 */
export async function sendConsultationForm(data: ConsultationFormData): Promise<ApiResponse<FormSubmissionResponse>> {
  return api.post<FormSubmissionResponse>('/consultation', {
    ...data,
    source: 'consultation-form',
    timestamp: new Date().toISOString(),
  });
}

/**
 * Отправка формы расчета стоимости
 */
export async function sendCalculationForm(data: CalculationFormData): Promise<ApiResponse<FormSubmissionResponse>> {
  return api.post<FormSubmissionResponse>('/calculation', {
    ...data,
    source: 'calculation-form',
    timestamp: new Date().toISOString(),
  });
}

/**
 * Отправка формы вызова замерщика
 */
export async function sendMeasurementForm(data: MeasurementFormData): Promise<ApiResponse<FormSubmissionResponse>> {
  return api.post<FormSubmissionResponse>('/measurement', {
    ...data,
    source: 'measurement-form',
    timestamp: new Date().toISOString(),
  });
}

/**
 * Отправка формы заказа услуги
 */
export async function sendOrderForm(data: OrderFormData): Promise<ApiResponse<FormSubmissionResponse>> {
  return api.post<FormSubmissionResponse>('/order', {
    ...data,
    source: 'order-form',
    timestamp: new Date().toISOString(),
  });
}

/**
 * Вспомогательные функции для валидации
 */
export function validatePhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 10;
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateRequired(value: string): boolean {
  return value.trim().length > 0;
}

/**
 * Генерация моковых данных для тестирования
 */
export function generateMockFormData<T extends Record<string, any>>(formType: string): T {
  const baseData = {
    name: 'Иван Иванов',
    phone: '+7 (912) 222-02-41',
    email: 'test@example.com',
    message: 'Тестовое сообщение',
  };

  const formDataMap: Record<string, any> = {
    contact: {
      ...baseData,
      message: 'Интересует услуга сварки металлоконструкций',
    },
    callback: {
      name: 'Петр Петров',
      phone: '+7 (912) 222-02-41',
      preferredTime: '14:00-18:00',
      comment: 'Позвонить после 15:00',
    },
    consultation: {
      name: 'Сергей Сергеев',
      phone: '+7 (912) 222-02-41',
      service: 'Сварка металлоконструкций',
      details: 'Нужна консультация по выбору материала',
    },
    calculation: {
      serviceType: 'Сварка ворот',
      dimensions: {
        width: 3,
        height: 2,
        length: 0.5,
      },
      material: 'Сталь 3мм',
      color: 'Порошковая покраска',
      quantity: 1,
      ...baseData,
    },
    measurement: {
      address: 'г. Москва, ул. Примерная, д. 10, кв. 25',
      convenientTime: '10:00-14:00',
      date: '2024-12-15',
      ...baseData,
    },
    order: {
      service: 'Покраска металлоконструкций',
      ...baseData,
      deadline: '2024-12-20',
      budget: '15000-20000 руб',
      details: 'Покраска ворот и забора',
    },
  };

  return (formDataMap[formType] || baseData) as T;
}