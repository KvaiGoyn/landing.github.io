'use client';

import React from 'react';
import { useForm, validationRules } from '@/app/hooks/useForm';
import { sendOrderForm, OrderFormData } from '@/app/services/forms';
import { useModal } from '@/app/context/ModalContext';

interface OrderFormProps {
  onSuccess?: () => void;
  compact?: boolean;
  defaultService?: string;
}

const OrderForm: React.FC<OrderFormProps> = ({ 
  onSuccess, 
  compact = false,
  defaultService = ''
}) => {
  const { closeModal } = useModal();

  const { values, errors, isSubmitting, isSuccess, submitError, getFieldProps, handleSubmit, formProps } = useForm<OrderFormData>({
    fields: {
      name: {
        initialValue: '',
        required: true,
        rules: [
          validationRules.required('Введите ваше имя'),
          validationRules.minLength(2, 'Имя должно содержать минимум 2 символа'),
        ],
      },
      phone: {
        initialValue: '',
        required: true,
        rules: [
          validationRules.required('Введите ваш телефон'),
          validationRules.phone('Введите корректный номер телефона'),
        ],
      },
      email: {
        initialValue: '',
        required: false,
        rules: [
          validationRules.email('Введите корректный email'),
        ],
      },
      service: {
        initialValue: defaultService || '',
        required: true,
        rules: [
          validationRules.required('Выберите услугу'),
        ],
      },
      deadline: {
        initialValue: '',
        required: false,
        rules: [
          validationRules.minLength(2, 'Укажите примерный срок'),
        ],
      },
      budget: {
        initialValue: '',
        required: false,
        rules: [],
      },
      details: {
        initialValue: '',
        required: false,
        rules: [
          validationRules.maxLength(1000, 'Описание не должно превышать 1000 символов'),
        ],
      },
    },
    onSubmit: async (formValues) => {
      // Создаем FormData для отправки на наш прокси-маршрут
      const formData = new FormData();
      
      // Добавляем все поля формы
      Object.entries(formValues).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });
      
      // Добавляем скрытые поля для FormSubmit и редиректа
      formData.append('_subject', 'Заказ услуги с лендинга Стиль Мастер');
      formData.append('_next', '/thank-you');
      formData.append('_captcha', 'false');
      formData.append('_template', 'table');
      formData.append('formType', 'order-form');
      
      // Отправляем данные на наш API маршрут
      const response = await fetch('/api/formsubmit', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Ошибка при отправке формы: ${errorText}`);
      }
      
      // Проверяем, является ли ответ редиректом
      if (response.redirected) {
        // Если редирект выполнен сервером, переходим на страницу благодарности
        window.location.href = response.url;
      } else {
        // Если нет редиректа, парсим JSON ответ (на случай ошибки)
        const data = await response.json();
        if (data.success === false) {
          throw new Error(data.message || 'Ошибка при отправке формы');
        }
        // Успешная отправка, но без редиректа - редиректим вручную
        window.location.href = '/thank-you';
      }
    },
    onSuccess: () => {
      // Этот колбэк будет вызван после успешного выполнения onSubmit
      // Но поскольку мы уже выполнили редирект в onSubmit, здесь можно просто закрыть модалку
      if (onSuccess) {
        onSuccess();
      } else {
        closeModal();
        // Не показываем alert, так как пользователь уже будет на странице благодарности
      }
    },
    onError: (error) => {
      console.error('Order form submission error:', error);
    },
  });

  if (isSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Заказ принят!</h3>
        <p className="text-gray-600 mb-6">
          Наш специалист свяжется с вами для уточнения деталей заказа.
        </p>
        <button
          onClick={closeModal}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition-colors"
        >
          Закрыть
        </button>
      </div>
    );
  }

  const services = [
    { value: 'Сварка металлоконструкций', label: 'Сварка металлоконструкций' },
    { value: 'Изготовление ворот и заборов', label: 'Изготовление ворот и заборов' },
    { value: 'Покраска металла', label: 'Покраска металла' },
    { value: 'Изготовление перил и ограждений', label: 'Изготовление перил и ограждений' },
    { value: 'Навесы и козырьки', label: 'Навесы и козырьки' },
    { value: 'Металлическая мебель', label: 'Металлическая мебель' },
    { value: 'Решётки на окна', label: 'Решётки на окна' },
    { value: 'Козырьки и навесы', label: 'Козырьки и навесы' },
    { value: 'Перила и лестницы', label: 'Перила и лестницы' },
    { value: 'Ворота и заборы', label: 'Ворота и заборы' },
    { value: 'Другое', label: 'Другое' },
  ];

  return (
    <div className={`bg-white rounded-2xl p-6 ${compact ? '' : 'border border-gray-100'}`}>
      {!compact && (
        <h3 className="text-xl font-bold text-gray-900 mb-6">Оформление заказа</h3>
      )}
      
      <form {...formProps} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Имя <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...getFieldProps('name')}
              className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'} outline-none transition-colors`}
              placeholder="Ваше имя"
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Телефон <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              {...getFieldProps('phone')}
              className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'} outline-none transition-colors`}
              placeholder="+7 (___) ___-__-__"
              disabled={isSubmitting}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email (необязательно)
          </label>
          <input
            type="email"
            {...getFieldProps('email')}
            className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'} outline-none transition-colors`}
            placeholder="example@mail.ru"
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Услуга <span className="text-red-500">*</span>
          </label>
          <select
            {...getFieldProps('service')}
            className={`w-full px-4 py-3 rounded-lg border ${errors.service ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'} outline-none transition-colors`}
            disabled={isSubmitting}
          >
            <option value="">Выберите услугу</option>
            {services.map((service) => (
              <option key={service.value} value={service.value}>
                {service.label}
              </option>
            ))}
          </select>
          {errors.service && (
            <p className="mt-1 text-sm text-red-600">{errors.service}</p>
          )}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Желаемый срок выполнения
            </label>
            <input
              type="text"
              {...getFieldProps('deadline')}
              className={`w-full px-4 py-3 rounded-lg border ${errors.deadline ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'} outline-none transition-colors`}
              placeholder="Например, 2 недели"
              disabled={isSubmitting}
            />
            {errors.deadline && (
              <p className="mt-1 text-sm text-red-600">{errors.deadline}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Примерный бюджет
            </label>
            <input
              type="text"
              {...getFieldProps('budget')}
              className={`w-full px-4 py-3 rounded-lg border ${errors.budget ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'} outline-none transition-colors`}
              placeholder="Например, 15000-20000 руб"
              disabled={isSubmitting}
            />
            {errors.budget && (
              <p className="mt-1 text-sm text-red-600">{errors.budget}</p>
            )}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Детали заказа (необязательно)
          </label>
          <textarea
            rows={4}
            {...getFieldProps('details')}
            className={`w-full px-4 py-3 rounded-lg border ${errors.details ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'} outline-none transition-colors resize-none`}
            placeholder="Опишите вашу задачу, укажите размеры, материалы, особенности..."
            disabled={isSubmitting}
          />
          {errors.details && (
            <p className="mt-1 text-sm text-red-600">{errors.details}</p>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="agree-order"
            className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
            required
            disabled={isSubmitting}
          />
          <label htmlFor="agree-order" className="text-sm text-gray-600">
            Согласен на обработку персональных данных
          </label>
        </div>
        
        {submitError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700 text-sm">{submitError}</p>
          </div>
        )}
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-primary/90 h-12 rounded-lg px-6 has-[>svg]:px-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-xl shadow-orange-500/25"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Отправка...
            </>
          ) : (
            <>
              Оформить заказ
              <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </>
          )}
        </button>
        
        <p className="text-xs text-gray-500 text-center">
          После отправки формы наш менеджер свяжется с вами для подтверждения заказа
        </p>
      </form>
    </div>
  );
};

export default OrderForm;