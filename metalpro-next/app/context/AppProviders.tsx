'use client';

import React, { ReactNode } from 'react';
import { ModalProvider } from './ModalContext';
import { FormProvider } from './FormContext';
import { FilterProvider } from './FilterContext';
import { UIProvider } from './UIContext';

/**
 * Компонент-обертка, предоставляющий все контексты приложения
 * Заменяет монолитный AppProvider на специализированные провайдеры
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ModalProvider>
      <FormProvider>
        <FilterProvider>
          <UIProvider>
            {children}
          </UIProvider>
        </FilterProvider>
      </FormProvider>
    </ModalProvider>
  );
}