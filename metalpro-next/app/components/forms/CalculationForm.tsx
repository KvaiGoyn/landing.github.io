'use client';

import React from 'react';
import { useModal } from '@/app/context/ModalContext';
import { Button } from '@/app/components/ui/Button/Button';

interface CalculationFormProps {
  onSuccess?: () => void;
  compact?: boolean;
}

const CalculationForm: React.FC<CalculationFormProps> = ({ onSuccess, compact = false }) => {
  const { closeModal } = useModal();

  return (
    <div className={`bg-white rounded-2xl p-6 ${compact ? '' : 'border border-gray-100'}`}>
      {!compact && (
        <h3 className="text-xl font-bold text-gray-900 mb-6">Расчет стоимости</h3>
      )}
      
      <form
        action="https://formsubmit.co/nezabut123@gmail.com"
        method="POST"
        className="space-y-4"
      >
        {/* Скрытые поля для настройки FormSubmit */}
        <input type="hidden" name="_subject" value="Заявка на расчет стоимости с лендинга Стиль Мастер" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_next" value="https://yourdomain.com/thanks" />
        
        {/* Скрытые поля параметров расчета (если нужны) */}
        <input type="hidden" name="serviceType" value="Другое" />
        <input type="hidden" name="material" value="" />
        <input type="hidden" name="color" value="" />
        <input type="hidden" name="quantity" value="1" />
        
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email (необязательно)
          </label>
          <input
            type="email"
            name="email"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-colors"
            placeholder="email@example.com"
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="agree-calculation"
            name="agree"
            value="yes"
            required
            className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
          />
          <label htmlFor="agree-calculation" className="text-sm text-gray-600">
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
          Получить расчет
        </Button>
        
        <p className="text-xs text-gray-500 text-center">
          Расчет стоимости производится в течение 24 часов
        </p>
      </form>
    </div>
  );
};

export default CalculationForm;