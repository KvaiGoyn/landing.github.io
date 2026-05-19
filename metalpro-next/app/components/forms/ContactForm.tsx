'use client';

import React from 'react';
import { useModal } from '@/app/context/ModalContext';
import { Button } from '@/app/components/ui/Button/Button';
import { useForm, validationRules } from '@/app/hooks/useForm';

interface ContactFormProps {
  onSuccess?: () => void;
  compact?: boolean;
}

interface ContactFormValues {
  name: string;
  phone: string;
  email: string;
  message: string;
  agree: boolean;
}

/**
 * Отправка формы через FormSubmit
 */
async function submitContactForm(values: ContactFormValues): Promise<void> {
  const formDataToSend = new FormData();
  formDataToSend.append('name', values.name);
  formDataToSend.append('phone', values.phone);
  formDataToSend.append('email', values.email);
  formDataToSend.append('message', values.message);
  formDataToSend.append('agree', values.agree ? 'yes' : 'no');
  // Hidden fields
  formDataToSend.append('_subject', 'Новая заявка с лендинга MetalPro');
  formDataToSend.append('_captcha', 'false');
  formDataToSend.append('_template', 'table');

  const response = await fetch('https://formsubmit.co/ajax/nezabut123@gmail.com', {
    method: 'POST',
    body: formDataToSend,
  });

  const data = await response.json();

  if (!(data.success === 'true' || data.success === true)) {
    throw new Error('Ошибка при отправке формы. Пожалуйста, попробуйте ещё раз.');
  }
}

const ContactForm: React.FC<ContactFormProps> = ({ onSuccess, compact = false }) => {
  const { closeModal } = useModal();

  const {
    values,
    errors,
    isSubmitting,
    isSuccess,
    submitError,
    handleChange,
    handleSubmit,
    getCheckboxProps,
    formProps,
  } = useForm<ContactFormValues>({
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
        rules: [
          validationRules.email('Введите корректный email адрес'),
        ],
      },
      message: {
        initialValue: '',
        required: true,
        rules: [
          validationRules.required('Введите ваше сообщение'),
          validationRules.minLength(10, 'Сообщение должно содержать минимум 10 символов'),
        ],
      },
      agree: {
        initialValue: false,
        required: true,
        rules: [
          {
            validator: (value) => value === true,
            message: 'Необходимо согласие на обработку персональных данных',
          },
        ],
      },
    },
    onSubmit: async (values) => {
      await submitContactForm(values);
    },
    onSuccess: (values) => {
      if (onSuccess) {
        onSuccess();
      } else {
        closeModal();
        alert('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');
      }
    },
    onError: (error) => {
      console.error('Form submission error:', error);
    },
    debounceSubmit: 500,
  });

  // Если форма успешно отправлена, показываем сообщение
  if (isSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Заявка отправлена!</h3>
        <p className="text-gray-600 mb-6">
          Мы свяжемся с вами в ближайшее время для уточнения деталей.
        </p>
        <Button
          onClick={() => window.location.reload()}
          variant="primary"
          size="md"
          rounded="lg"
        >
          Отправить еще одну заявку
        </Button>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl p-6 ${compact ? '' : 'border border-gray-100'}`}>
      {!compact && (
        <h3 className="text-xl font-bold text-gray-900 mb-6">Оставьте заявку</h3>
      )}
      
      <form 
        action="https://formsubmit.co/nezabut123@gmail.com" 
        method="POST"
        {...formProps}
        className="space-y-4"
      >
        {/* Скрытые поля для настройки FormSubmit */}
        <input type="hidden" name="_subject" value="Новая заявка с лендинга MetalPro" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_next" value="https://yourdomain.com/thanks" /> {/* Замените на ваш URL */}
        
        <div className="grid sm:grid-cols-2 gap-4">
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
              name="phone"
              value={values.phone}
              onChange={handleChange('phone')}
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
            Email
          </label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange('email')}
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
            Сообщение <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={4}
            name="message"
            value={values.message}
            onChange={handleChange('message')}
            className={`w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'} outline-none transition-colors resize-none`}
            placeholder="Опишите вашу задачу..."
            disabled={isSubmitting}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">{errors.message}</p>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="agree"
            {...getCheckboxProps('agree')}
            className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
            disabled={isSubmitting}
          />
          <label htmlFor="agree" className="text-sm text-gray-600">
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
        
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          rounded="lg"
          state={isSubmitting ? 'loading' : 'default'}
          rightIcon={
            <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          }
        >
          {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
        </Button>
        
        <p className="text-xs text-gray-500 text-center">
          Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
        </p>
      </form>
    </div>
  );
};

export default ContactForm;