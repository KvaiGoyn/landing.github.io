'use client';

import React, { ReactNode } from 'react';
import { ModalProvider } from './ModalContext';
import { UIProvider } from './UIContext';

/**
 * Компонент-обертка, предоставляющий все контексты приложения
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ModalProvider>
      <UIProvider>
        {children}
      </UIProvider>
    </ModalProvider>
  );
}