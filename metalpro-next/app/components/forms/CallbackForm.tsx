'use client';

import React from 'react';
import { useModal } from '@/app/context/ModalContext';
import { Button } from '@/app/components/ui/Button/Button';

interface CallbackFormProps {
  onSuccess?: () => void;
  compact?: boolean;
}

const CallbackForm: React.FC<CallbackFormProps> = ({ compact = false }) => {
  const { closeModal } = useModal();

  return (
    <div className={`bg-white rounded-2xl p-6 ${compact ? '' : 'border border-gray-100'}`}>
      {!compact && (
        <h3 className="text-xl font-bold text-gray-900 mb-6">Заказать обратный звонок</h3>
      )}
      
      <form
        action="/api/formsubmit"
        method="POST"
        className="space-y-4"
      >
        {/* Отправка через наш прокси-маршрут для отправки в FormSubmit и Telegram */}
        <input type="hidden" name="_next" value="/thank-you" />
        
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
            Удобное время для звонка
          </label>
          <select
            name="preferredTime"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-colors"
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
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-colors resize-none"
            placeholder="Дополнительная информация..."
          />
        </div>
        
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="agree-callback"
            name="agree"
            value="yes"
            required
            className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
          />
          <label htmlFor="agree-callback" className="text-sm text-gray-600">
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
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
          }
        >
          Заказать звонок
        </Button>
        
        <p className="text-xs text-gray-500 text-center">
          Мы перезваниваем в течение 15 минут в рабочее время
        </p>
      </form>
    </div>
  );
};

export default CallbackForm;