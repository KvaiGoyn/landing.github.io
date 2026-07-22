'use client';

import React, { useEffect, useCallback, useId, useRef } from 'react';
import Image from 'next/image';
import { useModal } from '@/app/context/ModalContext';

/**
 * Простой компонент модального окна
 */
const ModalOverlay: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  wide?: boolean;
}> = ({ isOpen, onClose, children, title, wide = false }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
      return;
    }

    if (event.key !== 'Tab' || !dialogRef.current) return;
    const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      const previousOverflow = document.body.style.overflow;
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => dialogRef.current?.focus());
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = previousOverflow;
        previousFocusRef.current?.focus();
      };
    }
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={`relative bg-white rounded-2xl shadow-2xl w-full ${wide ? 'max-w-5xl' : 'max-w-lg'} max-h-[90vh] overflow-y-auto animate-fade-in`}
      >
        <div className="flex items-center justify-between p-6 pb-0">
            <h2 id={titleId} className="text-xl font-bold text-gray-900">{title}</h2>
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
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

/**
 * Компонент для управления модальными окнами
 */
const ModalManager: React.FC = () => {
  const { activeModal, modalData, openModal, closeModal } = useModal();

  if (!activeModal) {
    return null;
  }

  const title = activeModal === 'callback' ? 'Заказать звонок'
    : activeModal === 'consultation' ? 'Получить консультацию'
    : activeModal === 'calculation' ? 'Рассчитать стоимость'
    : activeModal === 'measurement' ? 'Вызвать замерщика'
    : activeModal === 'contact' ? 'Связаться с нами'
    : activeModal === 'order' ? 'Заказать услугу'
    : modalData?.projectName || 'Детали проекта';

  if (activeModal === 'project-details') {
    const images = Array.isArray(modalData?.projectImages) ? modalData.projectImages as string[] : [];
    const features = Array.isArray(modalData?.projectFeatures) ? modalData.projectFeatures as string[] : [];

    return (
      <ModalOverlay isOpen onClose={closeModal} title={title} wide>
        <div className="space-y-8">
          {images.length > 0 && (
            <div className="space-y-3">
              <div className="relative aspect-video overflow-hidden rounded-xl bg-gray-100">
                <Image
                  src={images[0]}
                  alt={`${title}: общий вид проекта`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 960px"
                  priority
                />
              </div>
              {images.length > 1 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {images.slice(1).map((image, index) => (
                    <div key={image} className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
                      <Image
                        src={image}
                        alt={`${title}: этап проекта ${index + 2}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 240px"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="grid md:grid-cols-[1fr_auto] gap-8 items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">О проекте</h3>
              <p className="text-gray-600 leading-relaxed">{modalData?.projectDescription}</p>

              {features.length > 0 && (
                <ul className="mt-6 grid sm:grid-cols-2 gap-3">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-gray-700">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-700" aria-hidden="true">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <dl className="min-w-52 rounded-xl bg-gray-50 p-5 space-y-4">
              <div>
                <dt className="text-xs uppercase tracking-wide text-gray-500">Срок</dt>
                <dd className="mt-1 font-semibold text-gray-900">{modalData?.projectTimeline}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-gray-500">Стоимость</dt>
                <dd className="mt-1 font-semibold text-gray-900">{modalData?.projectPrice}</dd>
              </div>
            </dl>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 border-t border-gray-100 pt-6">
            <button
              type="button"
              onClick={closeModal}
              className="px-6 py-3 rounded-lg border border-gray-300 text-gray-800 font-medium hover:bg-gray-50"
            >
              Закрыть
            </button>
            <button
              type="button"
              onClick={() => openModal('order', { service: `Проект по образцу: ${title}` })}
              className="px-6 py-3 rounded-lg bg-orange-700 text-white text-center font-medium hover:bg-orange-800"
            >
              Обсудить похожий проект
            </button>
          </div>
        </div>
      </ModalOverlay>
    );
  }

  return (
    <ModalOverlay isOpen={!!activeModal} onClose={closeModal} title={title}>
      <div className="text-center">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </div>
        <p className="text-sm text-gray-600 mb-6">
          Оставьте ваш номер телефона, и мы свяжемся с вами в ближайшее время
        </p>
        <form
          action="/api/send/"
          method="POST"
          className="space-y-4"
        >
          <input type="hidden" name="_subject" value={`Новая заявка: ${activeModal}`} />
          <input type="hidden" name="formType" value={activeModal} />
          {modalData?.service && <input type="hidden" name="service" value={modalData.service} />}

          <div className="absolute -left-[9999px]" aria-hidden="true">
            <label htmlFor="modal-website">Не заполняйте это поле</label>
            <input id="modal-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <label htmlFor="modal-name" className="block text-left text-sm font-medium text-gray-700">Имя</label>
          <input
            type="text"
            id="modal-name"
            name="name"
            autoComplete="name"
            placeholder="Ваше имя"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-sm"
          />
          <label htmlFor="modal-phone" className="block text-left text-sm font-medium text-gray-700">Телефон</label>
          <input
            type="tel"
            id="modal-phone"
            name="phone"
            autoComplete="tel"
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
