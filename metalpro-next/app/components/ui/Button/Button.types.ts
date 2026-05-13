import { ReactNode, ButtonHTMLAttributes } from 'react';

/**
 * Варианты стилей кнопки
 */
export type ButtonVariant = 
  | 'primary'    // Основная кнопка
  | 'secondary'  // Вторичная кнопка
  | 'outline'    // Контурная кнопка
  | 'ghost'      // Прозрачная кнопка
  | 'danger'     // Опасное действие
  | 'success';   // Успешное действие

/**
 * Размеры кнопки
 */
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Состояния кнопки
 */
export type ButtonState = 'default' | 'loading' | 'success' | 'error' | 'disabled';

/**
 * Пропсы компонента Button
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Вариант стиля кнопки */
  variant?: ButtonVariant;
  
  /** Размер кнопки */
  size?: ButtonSize;
  
  /** Состояние кнопки */
  state?: ButtonState;
  
  /** Текст кнопки */
  children: ReactNode;
  
  /** Иконка слева */
  leftIcon?: ReactNode;
  
  /** Иконка справа */
  rightIcon?: ReactNode;
  
  /** Показывать ли спиннер загрузки */
  showLoadingSpinner?: boolean;
  
  /** Текст при состоянии успеха */
  successText?: string;
  
  /** Текст при состоянии ошибки */
  errorText?: string;
  
  /** Дополнительные CSS классы */
  className?: string;
  
  /** Ширина на всю доступную ширину */
  fullWidth?: boolean;
  
  /** Скругление углов */
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
}

/**
 * Классы для вариантов кнопки
 */
export const buttonVariants: Record<ButtonVariant, string> = {
  primary: 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 focus:ring-orange-500 border-transparent shadow-xl shadow-orange-500/25',
  secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500 border-transparent',
  outline: 'bg-transparent text-orange-600 border border-orange-600 hover:bg-orange-50 focus:ring-orange-500',
  ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500 border-transparent',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 border-transparent',
  success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 border-transparent',
};

/**
 * Классы для размеров кнопки
 */
export const buttonSizes: Record<ButtonSize, string> = {
  xs: 'px-2 py-1 text-xs',
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
  xl: 'px-8 py-4 text-xl',
};

/**
 * Классы для состояний кнопки
 */
export const buttonStates: Record<ButtonState, string> = {
  default: '',
  loading: 'opacity-80 cursor-wait',
  success: 'opacity-90 cursor-default',
  error: 'opacity-90 cursor-default',
  disabled: 'opacity-50 cursor-not-allowed',
};

/**
 * Классы для скругления
 */
export const buttonRounded: Record<NonNullable<ButtonProps['rounded']>, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
};