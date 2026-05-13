'use client';

import { ButtonProps, buttonVariants, buttonSizes, buttonStates, buttonRounded } from './Button.types';

/**
 * Иконка спиннера загрузки
 */
const LoadingSpinner = ({ size = 16 }: { size?: number }) => (
  <svg
    className="animate-spin"
    style={{ width: size, height: size }}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

/**
 * Иконка успеха
 */
const SuccessIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    style={{ width: size, height: size }}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

/**
 * Иконка ошибки
 */
const ErrorIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    style={{ width: size, height: size }}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path
      fillRule="evenodd"
      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

/**
 * Универсальный компонент кнопки
 */
export function Button({
  variant = 'primary',
  size = 'md',
  state = 'default',
  children,
  leftIcon,
  rightIcon,
  showLoadingSpinner = true,
  successText,
  errorText,
  className = '',
  fullWidth = false,
  rounded = 'md',
  type = 'button',
  disabled,
  onClick,
  ...props
}: ButtonProps) {
  // Определяем, отключена ли кнопка
  const isDisabled = disabled || state === 'disabled' || state === 'loading' || state === 'success';
  
  // Базовые классы
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors transition-shadow transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Классы варианта, размера, состояния и скругления
  const variantClass = buttonVariants[variant];
  const sizeClass = buttonSizes[size];
  const stateClass = buttonStates[state];
  const roundedClass = buttonRounded[rounded];
  
  // Классы ширины
  const widthClass = fullWidth ? 'w-full' : '';
  
  // Определяем контент кнопки в зависимости от состояния
  let buttonContent = children;
  let iconLeft = leftIcon;
  let iconRight = rightIcon;
  
  if (state === 'loading' && showLoadingSpinner) {
    iconLeft = <LoadingSpinner size={size === 'xs' || size === 'sm' ? 12 : 16} />;
    buttonContent = 'Загрузка...';
  } else if (state === 'success') {
    iconLeft = <SuccessIcon size={size === 'xs' || size === 'sm' ? 12 : 16} />;
    if (successText) {
      buttonContent = successText;
    }
  } else if (state === 'error') {
    iconLeft = <ErrorIcon size={size === 'xs' || size === 'sm' ? 12 : 16} />;
    if (errorText) {
      buttonContent = errorText;
    }
  }
  
  // Обработчик клика
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isDisabled) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };
  
  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClass} ${sizeClass} ${stateClass} ${roundedClass} ${widthClass} ${className}`}
      disabled={isDisabled}
      onClick={handleClick}
      aria-disabled={isDisabled}
      aria-busy={state === 'loading'}
      {...props}
    >
      {/* Левая иконка */}
      {iconLeft && (
        <span className="mr-2 flex items-center">
          {iconLeft}
        </span>
      )}
      
      {/* Текст кнопки */}
      <span className="whitespace-nowrap">
        {buttonContent}
      </span>
      
      {/* Правая иконка */}
      {iconRight && (
        <span className="ml-2 flex items-center">
          {iconRight}
        </span>
      )}
    </button>
  );
}

/**
 * Вспомогательные компоненты для быстрого создания кнопок
 */
export function PrimaryButton(props: Omit<ButtonProps, 'variant'>) {
  return <Button variant="primary" {...props} />;
}

export function SecondaryButton(props: Omit<ButtonProps, 'variant'>) {
  return <Button variant="secondary" {...props} />;
}

export function OutlineButton(props: Omit<ButtonProps, 'variant'>) {
  return <Button variant="outline" {...props} />;
}

export function GhostButton(props: Omit<ButtonProps, 'variant'>) {
  return <Button variant="ghost" {...props} />;
}

export function DangerButton(props: Omit<ButtonProps, 'variant'>) {
  return <Button variant="danger" {...props} />;
}

export function SuccessButton(props: Omit<ButtonProps, 'variant'>) {
  return <Button variant="success" {...props} />;
}