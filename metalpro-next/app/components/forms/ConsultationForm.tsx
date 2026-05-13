'use client';

import React, { useState } from 'react';
import { useModal } from '@/app/context/AppContext';

interface ConsultationFormProps {
  onSuccess?: () => void;
  compact?: boolean;
  defaultService?: string;
}

const ConsultationForm: React.FC<ConsultationFormProps> = ({ 
  onSuccess, 
  compact = false,
  defaultService = ''
}) => {
  const { closeModal } = useModal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: defaultService || '',
    details: '',
    agree: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const services = [
    { value: 'Сварка металлоконструкций', label: 'Сварка металлоконструкций' },
    { value: 'Изготовление ворот и заборов', label: 'Изготовление ворот и заборов' },
    { value: 'Покраска металла', label: 'Покраска металла' },
    { value: 'Изготовление перил и ограждений', label: 'Изготовление перил и ограждений' },
    { value: 'Навесы и козырьки', label: 'Навесы и козырьки' },
    { value: 'Металлическая мебель', label: 'Металлическая мебель' },
    { value: 'Другое', label: 'Другое' },
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Введите ваше имя';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Имя должно содержать минимум 2 символа';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Введите ваш телефон';
    } else if (!/^[\d\s\-\+\(\)]{10,}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Введите корректный номер телефона';
    }

    if (!formData.service.trim()) {
      newErrors.service = 'Выберите услугу';
    }

    if (formData.details && formData.details.length > 1000) {
      newErrors.details = 'Описание не должно превышать 1000 символов';
    }

    if (!formData.agree) {
      newErrors.agree = 'Необходимо согласие на обработку персональных данных';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // Prepare form data for FormSubmit AJAX
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('service', formData.service);
    formDataToSend.append('details', formData.details);
    formDataToSend.append('agree', formData.agree ? 'yes' : 'no');
    // Hidden fields
    formDataToSend.append('_subject', 'Заявка на консультацию с лендинга MetalPro');
    formDataToSend.append('_captcha', 'false');
    formDataToSend.append('_template', 'table');
    // Optional: add _next if you have a thank you page
    // formDataToSend.append('_next', 'https://yourdomain.com/thanks');

    // Log form data for debugging
    console.log('ConsultationForm submitting to FormSubmit:', {
      name: formData.name,
      phone: formData.phone,
      service: formData.service,
      details: formData.details,
      agree: formData.agree,
    });

    // AJAX submission to FormSubmit
    fetch('https://formsubmit.co/ajax/nezabut123@gmail.com', {
      method: 'POST',
      body: formDataToSend,
    })
      .then(response => {
        console.log('FormSubmit response status:', response.status, response.ok);
        return response.json();
      })
      .then(data => {
        console.log('FormSubmit response data:', data);
        setIsSubmitting(false);
        if (data.success === 'true' || data.success === true) {
          setIsSuccess(true);
          if (onSuccess) {
            onSuccess();
          } else {
            closeModal();
            alert('Заявка на консультацию успешно отправлена! Наш специалист свяжется с вами в ближайшее время.');
          }
        } else {
          console.warn('FormSubmit reported failure:', data);
          setSubmitError('Ошибка при отправке формы. Пожалуйста, попробуйте ещё раз.');
        }
      })
      .catch(error => {
        setIsSubmitting(false);
        console.error('FormSubmit error details:', error);
        setSubmitError('Произошла ошибка сети. Пожалуйста, проверьте подключение и попробуйте ещё раз.');
      });
  };

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
        <h3 className="text-xl font-bold text-gray-900 mb-6">Запись на консультацию</h3>
      )}
      
      <form 
        action="https://formsubmit.co/nezabut123@gmail.com" 
        method="POST"
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        {/* Скрытые поля для настройки FormSubmit */}
        <input type="hidden" name="_subject" value="Заявка на консультацию с лендинга MetalPro" />
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
              value={formData.name}
              onChange={handleChange}
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
              value={formData.phone}
              onChange={handleChange}
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
            value={formData.service}
            onChange={handleChange}
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
            value={formData.details}
            onChange={handleChange}
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
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
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
              Получить консультацию
              <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </>
          )}
        </button>
        
        <p className="text-xs text-gray-500 text-center">
          Консультация бесплатна и ни к чему не обязывает
        </p>
      </form>
    </div>
  );
};

export default ConsultationForm;