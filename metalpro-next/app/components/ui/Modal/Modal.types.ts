import { ReactNode } from 'react';

/**
 * Пропсы компонента Modal
 */
export interface ModalProps {
  /** Открыто ли модальное окно */
  isOpen: boolean;
  
  /** Функция закрытия модального окна */
  onClose: () => void;
  
  /** Заголовок модального окна */
  title?: string;
  
  /** Контент модального окна */
  children: ReactNode;
  
  /** Размер модального окна */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  
  /** Позиция модального окна */
  position?: 'center' | 'top' | 'bottom';
  
  /** Закрывать ли при клике вне модалки */
  closeOnOverlayClick?: boolean;
  
  /** Закрывать ли при нажатии Escape */
  closeOnEsc?: boolean;
  
  /** Показывать ли кнопку закрытия */
  showCloseButton?: boolean;
  
  /** Дополнительные CSS классы */
  className?: string;
  
  /** Дополнительные стили для контента */
  contentClassName?: string;
  
  /** Дополнительные стили для оверлея */
  overlayClassName?: string;
  
  /** ID для accessibility */
  id?: string;
  
  /** Скрывать ли оверлей */
  hideOverlay?: boolean;
  
  /** Анимация появления */
  animation?: 'fade' | 'slide' | 'scale' | 'none';
  
  /** Длительность анимации в мс */
  animationDuration?: number;
}

/**
 * Размеры модального окна в пикселях
 */
export const modalSizes = {
  sm: 'max-w-2xl',
  md: 'max-w-5xl',
  lg: 'max-w-7xl',
  xl: 'max-w-[90vw]',
  full: 'max-w-full mx-4',
} as const;

/**
 * Позиции модального окна
 */
export const modalPositions = {
  center: 'items-center justify-center',
  top: 'items-start justify-center pt-8',
  bottom: 'items-end justify-center pb-8',
} as const;

/**
 * Анимации модального окна
 */
export const modalAnimations = {
  fade: {
    overlay: 'opacity-0',
    content: 'opacity-0 scale-95',
    overlayEnter: 'opacity-100',
    contentEnter: 'opacity-100 scale-100',
  },
  slide: {
    overlay: 'opacity-0',
    content: 'opacity-0 translate-y-4',
    overlayEnter: 'opacity-100',
    contentEnter: 'opacity-100 translate-y-0',
  },
  scale: {
    overlay: 'opacity-0',
    content: 'opacity-0 scale-95',
    overlayEnter: 'opacity-100',
    contentEnter: 'opacity-100 scale-100',
  },
  none: {
    overlay: '',
    content: '',
    overlayEnter: '',
    contentEnter: '',
  },
} as const;