'use client';

import React, { useState } from 'react';
import { useModal } from '@/app/context/AppContext';

interface CalculationFormProps {
  onSuccess?: () => void;
  compact?: boolean;
}

const CalculationForm: React.FC<CalculationFormProps> = ({ onSuccess, compact = false }) => {
  const { closeModal } = useModal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    serviceType: 'Другое',
    material: '',
    color: '',
    quantity: 1,
    name: '',
    phone: '',
    email: '',
    agree: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

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

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Введите корректный email адрес';
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
      [name]: type === 'checkbox' ? checked : (type === 'number' ? parseInt(value) || 0 : value),
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
    formDataToSend.append('email', formData.email);
    formDataToSend.append('serviceType', formData.serviceType);
    formDataToSend.append('material', formData.material);
    formDataToSend.append('color', formData.color);
    formDataToSend.append('quantity', formData.quantity.toString());
    formDataToSend.append('agree', formData.agree ? 'yes' : 'no');
    // Hidden fields
    formDataToSend.append('_subject', 'Заявка на расчет стоимости с лендинга MetalPro');
    formDataToSend.append('_captcha', 'false');
    formDataToSend.append('_template', 'table');
    // Optional: add _next if you have a thank you page
    // formDataToSend.append('_next', 'https://yourdomain.com/thanks');

    // Log form data for debugging
    console.log('CalculationForm submitting to FormSubmit:', {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      serviceType: formData.serviceType,
      material: formData.material,
      color: formData.color,
      quantity: formData.quantity,
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
            alert('Заявка на расчет стоимости успешно отправлена! Мы рассчитаем стоимость и свяжемся с вами в течение 24 часов.');
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
        action="https://formsubmit.co/nezabut123@gmail.com" 
        method="POST"
        onSubmit={handleSubmit}
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
            value={formData.name}
            onChange={handleChange}
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
            value={formData.phone}
            onChange={handleChange}
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
            value={formData.email}
            onChange={handleChange}
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
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
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