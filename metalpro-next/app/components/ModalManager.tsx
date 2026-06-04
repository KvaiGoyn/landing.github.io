'use client';

import React, { useEffect, useCallback } from 'react';
import { useModal } from '@/app/context/ModalContext';

/**
 * Простой компонент модального окна
 */
const ModalOverlay: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}> = ({ isOpen, onClose, children, title }) => {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fade-in">
        {title && (
          <div className="flex items-center justify-between p-6 pb-0">
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
              aria-label="Закрыть"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

/**
 * Компонент для управления модальными окнами
 */
const ModalManager: React.FC = () => {
  const { activeModal, modalData, closeModal } = useModal();

  if (!activeModal) {
    return null;
  }

  return (
    <ModalOverlay isOpen={!!activeModal} onClose={closeModal}>
      <div className="text-center">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {activeModal === 'callback' && 'Заказать звонок'}
          {activeModal === 'consultation' && 'Получить консультацию'}
          {activeModal === 'calculation' && 'Рассчитать стоимость'}
          {activeModal === 'measurement' && 'Вызвать замерщика'}
          {activeModal === 'contact' && 'Связаться с нами'}
          {activeModal === 'order' && 'Заказать услугу'}
          {activeModal === 'project-details' && (modalData?.projectName || 'Детали проекта')}
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Оставьте ваш номер телефона, и мы свяжемся с вами в ближайшее время
        </p>
        <form
          action="/api/send"
          method="POST"
          className="space-y-4"
        >
          <input type="hidden" name="_subject" value={`Новая заявка: ${activeModal}`} />
          <input type="hidden" name="formType" value={activeModal} />

          <input
            type="text"
            name="name"
            placeholder="Ваше имя"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-sm"
          />
          <input
            type="tel"
            name="phone"
            placeholder="+7 (___) ___-__-__"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-sm"
          />

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="agree-modal"
              name="agree"
              value="yes"
              required
              className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500 mt-0.5"
            />
            <label htmlFor="agree-modal" className="text-xs text-gray-500">
              Согласен на{' '}
              <a href="/legal/privacy-policy" target="_blank" className="text-orange-600 hover:text-orange-700 underline">
                обработку персональных данных
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors text-sm"
          >
            Отправить
          </button>
        </form>
      </div>
    </ModalOverlay>
  );
};

export default ModalManager;