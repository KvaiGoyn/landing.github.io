'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

// Типы для модальных окон
export type ModalType = 
  | 'callback'        // Обратный звонок
  | 'calculation'     // Расчет стоимости
  | 'consultation'    // Консультация
  | 'order'           // Заказ услуги
  | 'measurement'     // Вызов замерщика
  | 'project-details' // Детали проекта
  | 'contact'         // Контактная форма
  | null;

// Типы для форм
export interface FormState {
  isSubmitting: boolean;
  errors: Record<string, string>;
  isSuccess: boolean;
  data: Record<string, any>;
}

// Типы для фильтров портфолио
export type PortfolioFilter =
  | 'all'
  | 'Решётки'
  | 'Перила и лестницы'
  | 'Козырьки и навесы'
  | 'Ворота и заборы'
  | 'other';

// Состояние приложения
export interface AppState {
  // Модальные окна
  activeModal: ModalType;
  modalData: Record<string, any>;
  
  // Формы
  forms: Record<string, FormState>;
  
  // Фильтры портфолио
  activePortfolioFilter: PortfolioFilter;
  
  // Прочие состояния
  isMobileMenuOpen: boolean;
}

// Контекст
export interface AppContextType {
  state: AppState;
  openModal: (modalType: ModalType, data?: Record<string, any>) => void;
  closeModal: () => void;
  updateFormState: (formId: string, updates: Partial<FormState>) => void;
  setPortfolioFilter: (filter: PortfolioFilter) => void;
  toggleMobileMenu: () => void;
}

// Начальное состояние
const initialState: AppState = {
  activeModal: null,
  modalData: {},
  forms: {},
  activePortfolioFilter: 'all',
  isMobileMenuOpen: false,
};

// Создание контекста
const AppContext = createContext<AppContextType | undefined>(undefined);

// Провайдер контекста
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(initialState);

  // Открытие модального окна
  const openModal = useCallback((modalType: ModalType, data: Record<string, any> = {}) => {
    setState(prev => ({
      ...prev,
      activeModal: modalType,
      modalData: data,
    }));
    // Блокировка скролла на body
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }, []);

  // Закрытие модального окна
  const closeModal = useCallback(() => {
    setState(prev => ({
      ...prev,
      activeModal: null,
      modalData: {},
    }));
    // Разблокировка скролла
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }, []);

  // Обновление состояния формы
  const updateFormState = useCallback((formId: string, updates: Partial<FormState>) => {
    setState(prev => ({
      ...prev,
      forms: {
        ...prev.forms,
        [formId]: {
          ...(prev.forms[formId] || {
            isSubmitting: false,
            errors: {},
            isSuccess: false,
            data: {},
          }),
          ...updates,
        },
      },
    }));
  }, []);

  // Установка фильтра портфолио
  const setPortfolioFilter = useCallback((filter: PortfolioFilter) => {
    setState(prev => ({
      ...prev,
      activePortfolioFilter: filter,
    }));
  }, []);

  // Переключение мобильного меню
  const toggleMobileMenu = useCallback(() => {
    setState(prev => ({
      ...prev,
      isMobileMenuOpen: !prev.isMobileMenuOpen,
    }));
  }, []);

  const value: AppContextType = {
    state,
    openModal,
    closeModal,
    updateFormState,
    setPortfolioFilter,
    toggleMobileMenu,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Хук для использования контекста
export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

// Вспомогательные хуки
export function useModal() {
  const { state, openModal, closeModal } = useAppContext();
  return {
    activeModal: state.activeModal,
    modalData: state.modalData,
    openModal,
    closeModal,
    isModalOpen: state.activeModal !== null,
  };
}

export function useForm(formId: string) {
  const { state, updateFormState } = useAppContext();
  const formState = state.forms[formId] || {
    isSubmitting: false,
    errors: {},
    isSuccess: false,
    data: {},
  };

  const setSubmitting = (isSubmitting: boolean) => {
    updateFormState(formId, { isSubmitting });
  };

  const setErrors = (errors: Record<string, string>) => {
    updateFormState(formId, { errors });
  };

  const setSuccess = (isSuccess: boolean) => {
    updateFormState(formId, { isSuccess });
  };

  const setFormData = (data: Record<string, any>) => {
    updateFormState(formId, { data });
  };

  return {
    ...formState,
    setSubmitting,
    setErrors,
    setSuccess,
    setFormData,
  };
}

export function usePortfolioFilter() {
  const { state, setPortfolioFilter } = useAppContext();
  return {
    activeFilter: state.activePortfolioFilter,
    setFilter: setPortfolioFilter,
  };
}