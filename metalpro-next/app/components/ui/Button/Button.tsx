'use client';

import { ButtonProps, buttonVariants, buttonSizes, buttonStates, buttonRounded } from './Button.types';
import { LoadingSpinner, SuccessIcon, ErrorIcon, ButtonIcon } from './ButtonIcons';
import { useButtonClasses } from './useButtonClasses';

/**
 * Универсальный компонент кнопки
 *
 * @param variant - Вариант кнопки (primary, secondary, outline, ghost, danger, success)
 * @param size - Размер кнопки (xs, sm, md, lg, xl)
 * @param state - Состояние кнопки (default, disabled, loading, success, error)
 * @param children - Текст или содержимое кнопки
 * @param leftIcon - Иконка слева от текста
 * @param rightIcon - Иконка справа от текста
 * @param showLoadingSpinner - Показывать спиннер загрузки при состоянии loading
 * @param successText - Текст для состояния success (если не указан, используется children)
 * @param errorText - Текст для состояния error (если не указан, используется children)
 * @param className - Дополнительные CSS классы
 * @param fullWidth - Растянуть кнопку на всю ширину контейнера
 * @param rounded - Степень скругления углов (none, sm, md, lg, full)
 * @param type - HTML-тип кнопки (button, submit, reset)
 * @param disabled - Явное отключение кнопки
 * @param onClick - Обработчик клика
 * @param props - Остальные пропсы для элемента button
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
  
  // Вычисляем CSS классы с помощью хука
  const { buttonClasses } = useButtonClasses({
    variant,
    size,
    state,
    rounded,
    fullWidth,
    className,
  });
  
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
      className={buttonClasses}
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