'use client';

import React from 'react';
import { useModal } from '@/app/context/ModalContext';
import { Button } from '@/app/components/ui/Button/Button';

interface ContactFormProps {
  onSuccess?: () => void;
  compact?: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({ compact = false }) => {
  const { closeModal } = useModal();

  return (
    <div className={`bg-white rounded-2xl p-6 ${compact ? '' : 'border border-gray-100'}`}>
      {!compact && (
        <h3 className="text-xl font-bold text-gray-900 mb-6">Оставьте заявку</h3>
      )}
      
      <form
        action="https://formsubmit.co/nezabut123@gmail.com"
        method="POST"
        className="space-y-4"
      >
        {/* Скрытые поля для настройки FormSubmit */}
        <input type="hidden" name="_subject" value="Новая заявка с лендинга Стиль Мастер" />
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
            placeholder="your@email.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Сообщение <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={4}
            name="message"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-colors resize-none"
            placeholder="Опишите вашу задачу или вопрос..."
          />
        </div>
        
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="agree-contact"
            name="agree"
            value="yes"
            required
            className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
          />
          <label htmlFor="agree-contact" className="text-sm text-gray-600">
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
              <path d="M22 2L11 13"></path>
              <path d="M22 2l-7 20-4-9-9-4 20-7z"></path>
            </svg>
          }
        >
          Отправить заявку
        </Button>
        
        <p className="text-xs text-gray-500 text-center">
          Мы ответим в течение 30 минут в рабочее время
        </p>
      </form>
    </div>
  );
};

export default ContactForm;