'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { ModalProps, modalSizes, modalPositions, modalAnimations } from './Modal.types';

// Иконка закрытия (крестик) как SVG
const CloseIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

/**
 * Универсальный компонент модального окна
 */
export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  position = 'center',
  closeOnOverlayClick = true,
  closeOnEsc = true,
  showCloseButton = true,
  className = '',
  contentClassName = '',
  overlayClassName = '',
  id = 'modal',
  hideOverlay = false,
  animation = 'fade',
  animationDuration = 300,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Обработчик нажатия клавиши Escape
  useEffect(() => {
    if (!closeOnEsc || !isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [closeOnEsc, isOpen, onClose]);

  // Управление фокусом и скроллом
  useEffect(() => {
    if (isOpen) {
      // Сохраняем текущий активный элемент
      previousActiveElement.current = document.activeElement as HTMLElement;
      
      // Блокируем скролл на body
      document.body.style.overflow = 'hidden';
      
      // Фокусируемся на модальном окне для accessibility
      setTimeout(() => {
        modalRef.current?.focus();
      }, 50);
    } else {
      // Восстанавливаем скролл
      document.body.style.overflow = '';
      
      // Возвращаем фокус на предыдущий элемент
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Обработчик клика по оверлею
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!closeOnOverlayClick) return;
    
    // Закрываем только если клик был по оверлею (не по контенту)
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Если модальное окно закрыто, не рендерим ничего
  if (!isOpen) return null;

  // Классы для анимации
  const animationClasses = modalAnimations[animation];
  // Используем inline стили для длительности анимации, чтобы Tailwind корректно обрабатывал классы
  const overlayTransition = 'transition-opacity';
  const contentTransition = 'transition-all ease-out';

  // Временные стили для отладки


  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? `${id}-title` : undefined}
      aria-describedby={title ? undefined : `${id}-description`}
      id={id}
    >
      {/* Оверлей */}
      {!hideOverlay && (
        <div
          className={`fixed inset-0 bg-black/50 ${overlayTransition} ${animationClasses.overlay} ${
            isOpen ? animationClasses.overlayEnter : ''
          } ${overlayClassName}`}
          style={{ transitionDuration: `${animationDuration}ms` }}
          onClick={handleOverlayClick}
          data-testid="modal-overlay"
        />
      )}

      {/* Контейнер модального окна */}
      <div
        className={`fixed inset-0 flex ${modalPositions[position]} p-4 ${className}`}
        onClick={closeOnOverlayClick ? handleOverlayClick : undefined}
      >
        {/* Контент модального окна */}
        <div
          ref={modalRef}
          className={`relative bg-white rounded-lg shadow-xl w-full ${modalSizes[size]} ${contentTransition} ${
            animationClasses.content
          } ${isOpen ? animationClasses.contentEnter : ''} ${contentClassName}`}
          style={{ transitionDuration: `${animationDuration}ms` }}
          tabIndex={-1}
          role="document"
        >
          {/* Заголовок */}
          {title && (
            <div className="flex items-center justify-between p-6 pb-4 border-b">
              <h2
                id={`${id}-title`}
                className="text-xl font-semibold text-gray-900"
              >
                {title}
              </h2>
              
              {showCloseButton && (
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1 -mr-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
                  aria-label="Закрыть модальное окно"
                >
                  <CloseIcon size={24} />
                </button>
              )}
            </div>
          )}

          {/* Контент */}
          <div className={title ? 'p-6' : 'p-8'}>
            {!title && showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
                aria-label="Закрыть модальное окно"
              >
                <CloseIcon size={20} />
              </button>
            )}
            
            <div id={title ? undefined : `${id}-description`}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Компонент заголовка модального окна
 */
export function ModalHeader({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  );
}

/**
 * Компонент тела модального окна
 */
export function ModalBody({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mb-6 ${className}`}>
      {children}
    </div>
  );
}

/**
 * Компонент футера модального окна
 */
export function ModalFooter({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`flex justify-end space-x-3 pt-4 border-t ${className}`}>
      {children}
    </div>
  );
}

/**
 * Хелпер для использования модального окна с хуком useModal
 */
export function ModalWithHook({
  modal,
  title,
  children,
  ...props
}: Omit<ModalProps, 'isOpen' | 'onClose'> & {
  modal: {
    isOpen: boolean;
    close: () => void;
    getModalProps: () => any;
  };
}) {
  return (
    <Modal
      isOpen={modal.isOpen}
      onClose={modal.close}
      title={title}
      {...modal.getModalProps()}
      {...props}
    >
      {children}
    </Modal>
  );
}