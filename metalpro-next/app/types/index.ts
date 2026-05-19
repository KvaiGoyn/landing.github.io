/**
 * Общие типы для проекта MetalPro
 */

// Базовые типы для API
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface ApiError {
  message: string;
  status?: number;
  errors?: Record<string, string[]>;
}

// Типы для форм
export interface FormData {
  [key: string]: string | number | boolean | File | null | undefined;
}

export interface FormErrors {
  [key: string]: string;
}

// Типы для модальных окон
export type ModalType = 
  | 'callback'
  | 'calculation'
  | 'consultation'
  | 'order'
  | 'measurement'
  | 'project-details'
  | 'contact'
  | null;

// Типы для фильтров портфолио
export type PortfolioFilter =
  | 'all'
  | 'Решётки'
  | 'Перила и лестницы'
  | 'Козырьки и навесы'
  | 'Ворота и заборы'
  | 'other';

// Типы для UI компонентов
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  state?: 'default' | 'loading' | 'success' | 'error' | 'disabled';
  children: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showLoadingSpinner?: boolean;
  successText?: string;
  errorText?: string;
  className?: string;
  fullWidth?: boolean;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

// Утилитарные типы
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type ValueOf<T> = T[keyof T];