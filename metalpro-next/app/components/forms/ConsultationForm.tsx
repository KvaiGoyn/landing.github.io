'use client';

import React from 'react';
import { useModal } from '@/app/context/ModalContext';
import { Button } from '@/app/components/ui/Button/Button';

interface ConsultationFormProps {
  onSuccess?: () => void;
  compact?: boolean;
  defaultService?: string;
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

const ConsultationForm: React.FC<ConsultationFormProps> = ({ 
  onSuccess, 
  compact = false,
  defaultService = ''
}) => {
  const { closeModal } = useModal();

  return (
    <div className={`bg-white rounded-2xl p-6 ${compact ? '' : 'border border-gray-100'}`}>
      {!compact && (
        <h3 className="text-xl font-bold text-gray-900 mb-6">Запись на консультацию</h3>
      )}
      
      <form
        action="/api/formsubmit"
        method="POST"
        className="space-y-4"
      >
        {/* Отправка через наш прокси-маршрут для отправки в FormSubmit и Telegram */}
        <input type="hidden" name="_subject" value="Заявка на консультацию с лендинга Стиль Мастер" />
        <input type="hidden" name="_next" value="/thank-you" />
        
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Имя <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-colors"
              placeholder="Ваше имя"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Телефон <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-colors"
              placeholder="+7 (___) ___-__-__"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Услуга <span className="text-red-500">*</span>
          </label>
          <select
            name="service"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-colors"
            defaultValue={defaultService}
          >
            <option value="">Выберите услугу</option>
            {services.map((service) => (
              <option key={service.value} value={service.value}>
                {service.label}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Детали (необязательно)
          </label>
          <textarea
            rows={4}
            name="details"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-colors resize-none"
            placeholder="Опишите вашу задачу, укажите размеры, материалы и другие детали..."
          />
        </div>
        
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="agree-consultation"
            name="agree"
            value="yes"
            required
            className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
          />
          <label htmlFor="agree-consultation" className="text-sm text-gray-600">
            Согласен на обработку персональных данных
          </label>
        </div>
        
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          rounded="lg"
          rightIcon={
            <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          }
        >
          Получить консультацию
        </Button>
        
        <p className="text-xs text-gray-500 text-center">
          Консультация бесплатна и ни к чему не обязывает
        </p>
      </form>
    </div>
  );
};

export default ConsultationForm;