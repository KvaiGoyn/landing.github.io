'use client';

import React from 'react';
import { useModal } from '@/app/context/ModalContext';
import { useForm } from '@/app/hooks/useForm';
import { validationRules } from '@/app/utils/validation';

interface CalculationFormProps {
  onSuccess?: () => void;
  compact?: boolean;
}

interface CalculationFormValues {
  serviceType: string;
  material: string;
  color: string;
  quantity: number;
  name: string;
  phone: string;
  email: string;
  agree: boolean;
}

async function submitCalculationForm(values: CalculationFormValues): Promise<void> {
  const formDataToSend = new FormData();
  formDataToSend.append('name', values.name);
  formDataToSend.append('phone', values.phone);
  formDataToSend.append('email', values.email);
  formDataToSend.append('serviceType', values.serviceType);
  formDataToSend.append('material', values.material);
  formDataToSend.append('color', values.color);
  formDataToSend.append('quantity', values.quantity.toString());
  formDataToSend.append('agree', values.agree ? 'yes' : 'no');
  // Hidden fields
  formDataToSend.append('_subject', 'Заявка на расчет стоимости с лендинга MetalPro');
  formDataToSend.append('_captcha', 'false');
  formDataToSend.append('_template', 'table');
  // Optional: add _next if you have a thank you page
  // formDataToSend.append('_next', 'https://yourdomain.com/thanks');

  const response = await fetch('https://formsubmit.co/ajax/nezabut123@gmail.com', {
    method: 'POST',
    body: formDataToSend,
  });
  const data = await response.json();
  if (!(data.success === 'true' || data.success === true)) {
    throw new Error('Ошибка при отправке формы. Пожалуйста, попробуйте ещё раз.');
  }
}

const CalculationForm: React.FC<CalculationFormProps> = ({ onSuccess, compact = false }) => {
  const { closeModal } = useModal();

  const { values, errors, isSubmitting, isSuccess, submitError, handleChange, handleSubmit, getCheckboxProps, formProps } = useForm<CalculationFormValues>({
    fields: {
      serviceType: {
        initialValue: 'Другое',
        required: false,
      },
      material: {
        initialValue: '',
        required: false,
      },
      color: {
        initialValue: '',
        required: false,
      },
      quantity: {
        initialValue: 1,
        required: false,
        rules: [
          validationRules.numeric('Количество должно быть числом'),
        ],
      },
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
          validationRules.email('Введите корректный email адрес'),
        ],
      },
      agree: {
        initialValue: false,
        required: true,
        rules: [
          validationRules.required('Необходимо согласие на обработку персональных данных'),
        ],
      },
    },
    onSubmit: async (values) => await submitCalculationForm(values),
    onSuccess: (values) => {
      if (onSuccess) {
        onSuccess();
      } else {
        closeModal();
        alert('Заявка на расчет стоимости успешно отправлена! Мы рассчитаем стоимость и свяжемся с вами в течение 24 часов.');
      }
    },
    onError: (error) => console.error('Form submission error:', error),
    debounceSubmit: 500,
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
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Заявка принята!</h3>
        <p className="text-gray-600 mb-6">
          Мы рассчитаем стоимость и свяжемся с вами в течение 24 часов.
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

  return (
    <div className={`bg-white rounded-2xl p-6 ${compact ? '' : 'border border-gray-100'}`}>
      {!compact && (
        <h3 className="text-xl font-bold text-gray-900 mb-6">Расчет стоимости</h3>
      )}
      
      <form 
        {...formProps}
        className="space-y-4"
      >
        {/* Скрытые поля для настройки FormSubmit */}
        <input type="hidden" name="_subject" value="Заявка на расчет стоимости с лендинга MetalPro" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_next" value="https://yourdomain.com/thanks" />
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Имя <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange('name')}
            className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'} outline-none transition-colors`}
            placeholder="Ваше имя"
            disabled={isSubmitting}
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Телефон <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={values.phone}
            onChange={handleChange('phone')}
            className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'} outline-none transition-colors`}
            placeholder="+7 (___) ___-__-__"
            disabled={isSubmitting}
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email (необязательно)
          </label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange('email')}
            className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'} outline-none transition-colors`}
            placeholder="email@example.com"
            disabled={isSubmitting}
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="agree-calculation"
            {...getCheckboxProps('agree')}
            className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
            disabled={isSubmitting}
          />
          <label htmlFor="agree-calculation" className="text-sm text-gray-600">
            Согласен на обработку персональных данных
          </label>
        </div>
        {errors.agree && (
          <p className="text-sm text-red-600">{errors.agree}</p>
        )}
        
        {submitError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700 text-sm">{submitError}</p>
          </div>
        )}
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Отправка...' : 'Заказать звонок'}
        </button>
        
        <p className="text-xs text-gray-500 text-center">
          Расчет стоимости производится в течение 24 часов
        </p>
      </form>
    </div>
  );
};

export default CalculationForm;