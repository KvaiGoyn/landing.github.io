'use client';

import React from 'react';
import { useModal } from '@/app/context/ModalContext';
import { Button } from '@/app/components/ui/Button/Button';
import { useForm, validationRules } from '@/app/hooks/useForm';

interface MeasurementFormProps {
  onSuccess?: () => void;
  compact?: boolean;
}

interface MeasurementFormValues {
  address: string;
  convenientTime: string;
  date: string;
  name: string;
  phone: string;
  comment: string;
  agree: boolean;
}

const timeSlots = [
  { value: '9:00-12:00', label: '9:00 - 12:00' },
  { value: '12:00-15:00', label: '12:00 - 15:00' },
  { value: '15:00-18:00', label: '15:00 - 18:00' },
  { value: '18:00-21:00', label: '18:00 - 21:00' },
  { value: 'Любое время', label: 'Любое время' },
];

/**
 * Отправка формы вызова замерщика через FormSubmit
 */
async function submitMeasurementForm(values: MeasurementFormValues): Promise<void> {
  const formDataToSend = new FormData();
  formDataToSend.append('address', values.address);
  formDataToSend.append('convenientTime', values.convenientTime);
  formDataToSend.append('date', values.date);
  formDataToSend.append('name', values.name);
  formDataToSend.append('phone', values.phone);
  formDataToSend.append('comment', values.comment);
  formDataToSend.append('agree', values.agree ? 'yes' : 'no');
  // Hidden fields
  formDataToSend.append('_subject', 'Заявка на вызов замерщика с лендинга Стиль Мастер');
  formDataToSend.append('_captcha', 'false');
  formDataToSend.append('_template', 'table');

  const response = await fetch('/api/formsubmit', {
    method: 'POST',
    body: formDataToSend,
  });

  const data = await response.json();

  if (!(data.success === 'true' || data.success === true)) {
    throw new Error('Ошибка при отправке формы. Пожалуйста, попробуйте ещё раз.');
  }
}

const MeasurementForm: React.FC<MeasurementFormProps> = ({ onSuccess, compact = false }) => {
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
  } = useForm<MeasurementFormValues>({
    fields: {
      address: {
        initialValue: '',
        required: true,
        rules: [
          validationRules.required('Введите адрес'),
          validationRules.minLength(10, 'Адрес должен содержать минимум 10 символов'),
        ],
      },
      convenientTime: {
        initialValue: '',
        required: true,
        rules: [
          validationRules.required('Выберите удобное время'),
        ],
      },
      date: {
        initialValue: '',
        required: false,
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
      await submitMeasurementForm(values);
    },
    onSuccess: (values) => {
      if (onSuccess) {
        onSuccess();
      } else {
        closeModal();
        alert('Заявка на вызов замерщика успешно отправлена! Наш специалист свяжется с вами для уточнения деталей.');
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
          Наш замерщик свяжется с вами для согласования времени и адреса выезда.
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
        <h3 className="text-xl font-bold text-gray-900 mb-6">Вызов замерщика</h3>
      )}
      
      <form
        action="/api/formsubmit"
        method="POST"
        {...formProps}
        className="space-y-4"
      >
        {/* Скрытые поля для настройки FormSubmit */}
        <input type="hidden" name="_subject" value="Заявка на вызов замерщика с лендинга Стиль Мастер" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_next" value="https://yourdomain.com/thanks" />
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Адрес <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={3}
            name="address"
            value={values.address}
            onChange={handleChange('address')}
            className={`w-full px-4 py-3 rounded-lg border ${errors.address ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'} outline-none transition-colors resize-none`}
            placeholder="Полный адрес с указанием города, улицы, дома и квартиры"
            disabled={isSubmitting}
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-600">{errors.address}</p>
          )}
        </div>
        
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Удобное время <span className="text-red-500">*</span>
            </label>
            <select
              name="convenientTime"
              value={values.convenientTime}
              onChange={handleChange('convenientTime')}
              className={`w-full px-4 py-3 rounded-lg border ${errors.convenientTime ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'} outline-none transition-colors`}
              disabled={isSubmitting}
            >
              <option value="">Выберите время</option>
              {timeSlots.map((slot) => (
                <option key={slot.value} value={slot.value}>
                  {slot.label}
                </option>
              ))}
            </select>
            {errors.convenientTime && (
              <p className="mt-1 text-sm text-red-600">{errors.convenientTime}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Предпочтительная дата
            </label>
            <input
              type="date"
              name="date"
              value={values.date}
              onChange={handleChange('date')}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-colors"
              disabled={isSubmitting}
            />
          </div>
        </div>
        
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
            Комментарий (необязательно)
          </label>
          <textarea
            rows={3}
            name="comment"
            value={values.comment}
            onChange={handleChange('comment')}
            className={`w-full px-4 py-3 rounded-lg border ${errors.comment ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'} outline-none transition-colors resize-none`}
            placeholder="Дополнительная информация: что нужно замерить, особенности доступа и т.д."
            disabled={isSubmitting}
          />
          {errors.comment && (
            <p className="mt-1 text-sm text-red-600">{errors.comment}</p>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="agree-measurement"
            {...getCheckboxProps('agree')}
            className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
            disabled={isSubmitting}
          />
          <label htmlFor="agree-measurement" className="text-sm text-gray-600">
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
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          }
        >
          {isSubmitting ? 'Отправка...' : 'Вызвать замерщика'}
        </Button>
        
        <p className="text-xs text-gray-500 text-center">
          Замер бесплатный. Выезд в пределах города в течение 24 часов.
        </p>
      </form>
    </div>
  );
};

export default MeasurementForm;