'use client';

import { useState, useCallback, useEffect } from 'react';

/**
 * Параметры модального окна
 */
export interface UseModalOptions {
  /** ID модального окна (для accessibility) */
  id?: string;
  /** Закрывать ли при клике вне модалки */
  closeOnOverlayClick?: boolean;
  /** Закрывать ли при нажатии Escape */
  closeOnEsc?: boolean;
  /** Блокировать ли скролл на body при открытии */
  blockScroll?: boolean;
  /** Вызывается при открытии */
  onOpen?: () => void;
  /** Вызывается при закрытии */
  onClose?: () => void;
}

/**
 * Хук для управления состоянием модального окна
 * @param initialOpen Начальное состояние (открыто/закрыто)
 * @param options Дополнительные опции
 * @returns Объект с состоянием и методами управления
 */
export function useModal(
  initialOpen: boolean = false,
  options: UseModalOptions = {}
) {
  const {
    id = 'modal',
    closeOnOverlayClick = true,
    closeOnEsc = true,
    blockScroll = true,
    onOpen,
    onClose,
  } = options;

  const [isOpen, setIsOpen] = useState(initialOpen);
  const [isVisible, setIsVisible] = useState(initialOpen);

  // Обработчик открытия
  const open = useCallback(() => {
    setIsOpen(true);
    setIsVisible(true);
    onOpen?.();
    
    if (blockScroll && typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }, [onOpen, blockScroll]);

  // Обработчик закрытия
  const close = useCallback(() => {
    setIsVisible(false);
    // Задержка для анимации закрытия
    setTimeout(() => {
      setIsOpen(false);
      onClose?.();
      
      if (blockScroll && typeof document !== 'undefined') {
        document.body.style.overflow = '';
      }
    }, 300); // Соответствует длительности анимации в CSS
  }, [onClose, blockScroll]);

  // Переключение состояния
  const toggle = useCallback(() => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  }, [isOpen, open, close]);

  // Обработчик нажатия клавиши Escape
  useEffect(() => {
    if (!closeOnEsc || !isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [closeOnEsc, isOpen, close]);

  // Обработчик клика вне модалки
  const handleOverlayClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!closeOnOverlayClick) return;
    
    // Закрываем только если клик был по оверлею (не по контенту)
    if (e.target === e.currentTarget) {
      close();
    }
  }, [closeOnOverlayClick, close]);

  // ARIA атрибуты для accessibility
  const getModalProps = useCallback(() => {
    return {
      role: 'dialog',
      'aria-modal': true,
      'aria-labelledby': `${id}-title`,
      'aria-describedby': `${id}-description`,
    };
  }, [id]);

  // Пропсы для оверлея
  const getOverlayProps = useCallback(() => {
    return {
      onClick: handleOverlayClick,
      'data-testid': 'modal-overlay',
    };
  }, [handleOverlayClick]);

  return {
    // Состояние
    isOpen,
    isVisible,
    
    // Методы
    open,
    close,
    toggle,
    
    // Пропсы для компонентов
    getModalProps,
    getOverlayProps,
    
    // ID для accessibility
    modalId: id,
  };
}

/**
 * Хук для управления несколькими модальными окнами
 */
export function useMultiModal() {
  const [modals, setModals] = useState<Record<string, boolean>>({});

  const openModal = useCallback((modalId: string) => {
    setModals(prev => ({ ...prev, [modalId]: true }));
  }, []);

  const closeModal = useCallback((modalId: string) => {
    setModals(prev => ({ ...prev, [modalId]: false }));
  }, []);

  const toggleModal = useCallback((modalId: string) => {
    setModals(prev => ({ ...prev, [modalId]: !prev[modalId] }));
  }, []);

  const isModalOpen = useCallback((modalId: string) => {
    return !!modals[modalId];
  }, [modals]);

  return {
    modals,
    openModal,
    closeModal,
    toggleModal,
    isModalOpen,
  };
}