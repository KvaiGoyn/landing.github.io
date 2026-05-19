import { ButtonVariant, ButtonSize, ButtonState } from './Button.types';
import { buttonVariants, buttonSizes, buttonStates, buttonRounded } from './Button.types';

/**
 * Параметры для вычисления классов кнопки
 */
export interface UseButtonClassesParams {
  variant?: ButtonVariant;
  size?: ButtonSize;
  state?: ButtonState;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  fullWidth?: boolean;
  className?: string;
}

/**
 * Хук для вычисления CSS классов кнопки
 */
export function useButtonClasses({
  variant = 'primary',
  size = 'md',
  state = 'default',
  rounded = 'md',
  fullWidth = false,
  className = '',
}: UseButtonClassesParams) {
  // Базовые классы
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors transition-shadow transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Классы варианта, размера, состояния и скругления
  const variantClass = buttonVariants[variant];
  const sizeClass = buttonSizes[size];
  const stateClass = buttonStates[state];
  const roundedClass = buttonRounded[rounded];
  
  // Классы ширины
  const widthClass = fullWidth ? 'w-full' : '';
  
  // Собираем все классы
  const buttonClasses = [
    baseClasses,
    variantClass,
    sizeClass,
    stateClass,
    roundedClass,
    widthClass,
    className,
  ]
    .filter(Boolean)
    .join(' ')
    .trim();

  return {
    buttonClasses,
    variantClass,
    sizeClass,
    stateClass,
    roundedClass,
    widthClass,
  };
}