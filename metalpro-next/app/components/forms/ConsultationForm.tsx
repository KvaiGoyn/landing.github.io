'use client';

import React from 'react';
import { useModal } from '@/app/context/ModalContext';
import { Button } from '@/app/components/ui/Button/Button';
import { useForm, validationRules } from '@/app/hooks/useForm';

interface ConsultationFormProps {
  onSuccess?: () => void;
  compact?: boolean;
  defaultService?: string;
}

interface ConsultationFormValues {
  name: string;
  phone: string;
  service: string;
  details: string;
  agree: boolean;
}

const services = [
  { value: 'Сварка металлоконструкций', label: 'Сварка металлоконструкций' },
  { value: 'Изготовление ворот и заборов', label: 'Изготовление ворот и заборов' },
  { value: 'Покраска металла', label: 'Покраска металла' },
  { value: 'Изготовление перил и ограждений', label: 'Изготовление перил и ограждений' },
  { value: 'Навесы и козырьки', label: 'Навесы и козырьки' },
  { value: 'Металлическая мебель', label: 'Металлическая мебель' },
  { value: 'Другое', label: 'Другое' },
];

/**
 * Отправка формы консультации через FormSubmit
 */
async function submitConsultationForm(values: ConsultationFormValues): Promise<void> {
  const formDataToSend = new FormData();
  formDataToSend.append('name', values.name);
  formDataToSend.append('phone', values.phone);
  formDataToSend.append('service', values.service);
  formDataToSend.append('details', values.details);
  formDataToSend.append('agree', values.agree ? 'yes' : 'no');
  // Hidden fields
  formDataToSend.append('_subject', 'Заявка на консультацию с лендинга Стиль Мастер');
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

const ConsultationForm: React.FC<ConsultationFormProps> = ({ 
  onSuccess, 
  compact = false,
  defaultService = ''
}) => {
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
  } = useForm<ConsultationFormValues>({
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
      service: {
        initialValue: defaultService || '',
        required: true,
        rules: [
          validationRules.required('Выберите услугу'),
        ],
      },
      details: {
        initialValue: '',
        required: false,
        rules: [
          validationRules.maxLength(1000, 'Описание не должно превышать 1000 символов'),
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
      await submitConsultationForm(values);
    },
    onSuccess: (values) => {
      if (onSuccess) {
        onSuccess();
      } else {
        closeModal();
        alert('Заявка на консультацию успешно отправлена! Наш специалист свяжется с вами в ближайшее время.');
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
          Наш специалист свяжется с вами для консультации по выбранной услуге.
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
        <h3 className="text-xl font-bold text-gray-900 mb-6">Запись на консультацию</h3>
      )}
      
      <form 
        action="https://formsubmit.co/nezabut123@gmail.com" 
        method="POST"
        {...formProps}
        className="space-y-4"
      >
        {/* Скрытые поля для настройки FormSubmit */}
        <input type="hidden" name="_subject" value="Заявка на консультацию с лендинга Стиль Мастер" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_next" value="https://yourdomain.com/thanks" />
        
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
            Услуга <span className="text-red-500">*</span>
          </label>
          <select
            name="service"
            value={values.service}
            onChange={handleChange('service')}
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
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Детали (необязательно)
          </label>
          <textarea
            rows={4}
            name="details"
            value={values.details}
            onChange={handleChange('details')}
            className={`w-full px-4 py-3 rounded-lg border ${errors.details ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'} outline-none transition-colors resize-none`}
            placeholder="Опишите вашу задачу, укажите размеры, материалы и другие детали..."
            disabled={isSubmitting}
          />
          {errors.details && (
            <p className="mt-1 text-sm text-red-600">{errors.details}</p>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="agree-consultation"
            {...getCheckboxProps('agree')}
            className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
            disabled={isSubmitting}
          />
          <label htmlFor="agree-consultation" className="text-sm text-gray-600">
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
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          }
        >
          {isSubmitting ? 'Отправка...' : 'Получить консультацию'}
        </Button>
        
        <p className="text-xs text-gray-500 text-center">
          Консультация бесплатна и ни к чему не обязывает
        </p>
      </form>
    </div>
  );
};

export default ConsultationForm;