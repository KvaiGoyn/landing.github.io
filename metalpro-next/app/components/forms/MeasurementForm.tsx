'use client';

import React from 'react';
import { useModal } from '@/app/context/ModalContext';
import { Button } from '@/app/components/ui/Button/Button';

interface MeasurementFormProps {
  onSuccess?: () => void;
  compact?: boolean;
}

const timeSlots = [
  { value: '9:00-12:00', label: '9:00 - 12:00' },
  { value: '12:00-15:00', label: '12:00 - 15:00' },
  { value: '15:00-18:00', label: '15:00 - 18:00' },
  { value: '18:00-21:00', label: '18:00 - 21:00' },
  { value: 'Любое время', label: 'Любое время' },
];

const MeasurementForm: React.FC<MeasurementFormProps> = ({ onSuccess, compact = false }) => {
  const { closeModal } = useModal();

  return (
    <div className={`bg-white rounded-2xl p-6 ${compact ? '' : 'border border-gray-100'}`}>
      {!compact && (
        <h3 className="text-xl font-bold text-gray-900 mb-6">Вызов замерщика</h3>
      )}
      
      <form
        action="https://formsubmit.co/nezabut123@gmail.com"
        method="POST"
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
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-colors resize-none"
            placeholder="Полный адрес с указанием города, улицы, дома и квартиры"
          />
        </div>
        
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Удобное время <span className="text-red-500">*</span>
            </label>
            <select
              name="convenientTime"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-colors"
            >
              <option value="">Выберите время</option>
              {timeSlots.map((slot) => (
                <option key={slot.value} value={slot.value}>
                  {slot.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Предпочтительная дата
            </label>
            <input
              type="date"
              name="date"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-colors"
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
            Комментарий (необязательно)
          </label>
          <textarea
            rows={3}
            name="comment"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-colors resize-none"
            placeholder="Дополнительная информация: что нужно замерить, особенности доступа и т.д."
          />
        </div>
        
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="agree-measurement"
            name="agree"
            value="yes"
            required
            className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
          />
          <label htmlFor="agree-measurement" className="text-sm text-gray-600">
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
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          }
        >
          Вызвать замерщика
        </Button>
        
        <p className="text-xs text-gray-500 text-center">
          Замер бесплатный. Выезд в пределах города в течение 24 часов.
        </p>
      </form>
    </div>
  );
};

export default MeasurementForm;