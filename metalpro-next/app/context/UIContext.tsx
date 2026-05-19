'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

// Состояние UI
export interface UIState {
  isMobileMenuOpen: boolean;
}

// Контекст UI
export interface UIContextType {
  state: UIState;
  toggleMobileMenu: () => void;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
}

// Начальное состояние
const initialState: UIState = {
  isMobileMenuOpen: false,
};

// Создание контекста
const UIContext = createContext<UIContextType | undefined>(undefined);

// Провайдер контекста
export function UIProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<UIState>(initialState);

  // Переключение мобильного меню
  const toggleMobileMenu = useCallback(() => {
    setState(prev => ({
      ...prev,
      isMobileMenuOpen: !prev.isMobileMenuOpen,
    }));
  }, []);

  // Открытие мобильного меню
  const openMobileMenu = useCallback(() => {
    setState(prev => ({
      ...prev,
      isMobileMenuOpen: true,
    }));
  }, []);

  // Закрытие мобильного меню
  const closeMobileMenu = useCallback(() => {
    setState(prev => ({
      ...prev,
      isMobileMenuOpen: false,
    }));
  }, []);

  const value: UIContextType = {
    state,
    toggleMobileMenu,
    openMobileMenu,
    closeMobileMenu,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

// Хук для использования контекста UI
export function useUIContext() {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUIContext must be used within a UIProvider');
  }
  return context;
}

// Удобный хук для работы с мобильным меню
export function useMobileMenu() {
  const { state, toggleMobileMenu, openMobileMenu, closeMobileMenu } = useUIContext();
  return {
    isMobileMenuOpen: state.isMobileMenuOpen,
    toggleMobileMenu,
    openMobileMenu,
    closeMobileMenu,
  };
}