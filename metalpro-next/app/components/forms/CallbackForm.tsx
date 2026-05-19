'use client';

import React from 'react';
import { useModal } from '@/app/context/ModalContext';
import { Button } from '@/app/components/ui/Button/Button';
import { useForm, validationRules } from '@/app/hooks/useForm';

interface CallbackFormProps {
  onSuccess?: () => void;
  compact?: boolean;
}

interface CallbackFormValues {
  name: string;
  phone: string;
  preferredTime: string;
  comment: string;
  agree: boolean;
}

/**
 * Отправка формы обратного звонка через FormSubmit
 */
async function submitCallbackForm(values: CallbackFormValues): Promise<void> {
  const formDataToSend = new FormData();
  formDataToSend.append('name', values.name);
  formDataToSend.append('phone', values.phone);
  formDataToSend.append('preferredTime', values.preferredTime);
  formDataToSend.append('comment', values.comment);
  formDataToSend.append('agree', values.agree ? 'yes' : 'no');
  // Hidden fields
  formDataToSend.append('_subject', 'Заявка на обратный звонок с лендинга MetalPro');
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

const CallbackForm: React.FC<CallbackFormProps> = ({ onSuccess, compact = false }) => {
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
  } = useForm<CallbackFormValues>({
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
      preferredTime: {
        initialValue: '',
        required: false,
      },
      comment: {
        initialValue: '',
        required: false,
        rules: [
          validationRules.maxLength(500, 'Комментарий не должен превышать 500 символов'),
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
      await submitCallbackForm(values);
    },
    onSuccess: (values) => {
      if (onSuccess) {
        onSuccess();
      } else {
        closeModal();
        alert('Заявка на обратный звонок успешно отправлена! Мы позвоним вам в ближайшее время.');
      }
    },
    onError: (error) => {
      console.error('Form submission error:', error);
    },
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
          Мы перезвоним вам в указанное время. Ожидайте звонка.
        </p>
        <Button
          onClick={closeModal}
          variant="primary"
          size="md"
          rounded="lg"
        >
          Закрыть
        </Button>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl p-6 ${compact ? '' : 'border border-gray-100'}`}>
      {!compact && (
        <h3 className="text-xl font-bold text-gray-900 mb-6">Заказать обратный звонок</h3>
      )}
      
      <form 
        action="https://formsubmit.co/nezabut123@gmail.com" 
        method="POST"
        {...formProps}
        className="space-y-4"
      >
        {/* Скрытые поля для настройки FormSubmit */}
        <input type="hidden" name="_subject" value="Заявка на обратный звонок с лендинга MetalPro" />
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
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Удобное время для звонка
          </label>
          <select
            name="preferredTime"
            value={values.preferredTime}
            onChange={handleChange('preferredTime')}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-colors"
            disabled={isSubmitting}
          >
            <option value="">Выберите время</option>
            <option value="9:00-12:00">9:00 - 12:00</option>
            <option value="12:00-15:00">12:00 - 15:00</option>
            <option value="15:00-18:00">15:00 - 18:00</option>
            <option value="18:00-21:00">18:00 - 21:00</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Комментарий (необязательно)
          </label>
          <textarea
            rows={3}
            name="comment"
            value={values.comment}
            onChange={handleChange('comment')}
            className={`w-full px-4 py-3 rounded-lg border ${errors.comment ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'} outline-none transition-colors resize-none`}
            placeholder="Дополнительная информация..."
            disabled={isSubmitting}
          />
          {errors.comment && (
            <p className="mt-1 text-sm text-red-600">{errors.comment}</p>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="agree-callback"
            {...getCheckboxProps('agree')}
            className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
            disabled={isSubmitting}
          />
          <label htmlFor="agree-callback" className="text-sm text-gray-600">
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
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
          }
        >
          {isSubmitting ? 'Отправка...' : 'Заказать звонок'}
        </Button>
        
        <p className="text-xs text-gray-500 text-center">
          Мы перезваниваем в течение 15 минут в рабочее время
        </p>
      </form>
    </div>
  );
};

export default CallbackForm;