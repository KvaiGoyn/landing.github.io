'use client';

import React from 'react';

/**
 * Иконка спиннера загрузки
 */
export const LoadingSpinner = ({ size = 16 }: { size?: number }) => (
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
export const SuccessIcon = ({ size = 16 }: { size?: number }) => (
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
export const ErrorIcon = ({ size = 16 }: { size?: number }) => (
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
 * Типы иконок
 */
export type ButtonIconType = 'loading' | 'success' | 'error';

/**
 * Компонент для отображения иконки по типу
 */
export const ButtonIcon = ({ 
  type, 
  size = 16 
}: { 
  type: ButtonIconType; 
  size?: number;
}) => {
  switch (type) {
    case 'loading':
      return <LoadingSpinner size={size} />;
    case 'success':
      return <SuccessIcon size={size} />;
    case 'error':
      return <ErrorIcon size={size} />;
    default:
      return null;
  }
};