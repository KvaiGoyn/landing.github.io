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

// Состояние модальных окон
export interface ModalState {
  activeModal: ModalType;
  modalData: Record<string, any>;
}

// Контекст модальных окон
export interface ModalContextType {
  state: ModalState;
  openModal: (modalType: ModalType, data?: Record<string, any>) => void;
  closeModal: () => void;
  isModalOpen: boolean;
}

// Начальное состояние
const initialState: ModalState = {
  activeModal: null,
  modalData: {},
};

// Создание контекста
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Провайдер контекста
export function ModalProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ModalState>(initialState);

  // Открытие модального окна
  const openModal = useCallback((modalType: ModalType, data: Record<string, any> = {}) => {
    setState({
      activeModal: modalType,
      modalData: data,
    });
    // Блокировка скролла на body
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }, []);

  // Закрытие модального окна
  const closeModal = useCallback(() => {
    setState({
      activeModal: null,
      modalData: {},
    });
    // Разблокировка скролла
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }, []);

  const value: ModalContextType = {
    state,
    openModal,
    closeModal,
    isModalOpen: state.activeModal !== null,
  };

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

// Хук для использования контекста модальных окон
export function useModalContext() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context;
}

// Удобный хук для работы с модальными окнами
export function useModal() {
  const { state, openModal, closeModal, isModalOpen } = useModalContext();
  return {
    activeModal: state.activeModal,
    modalData: state.modalData,
    openModal,
    closeModal,
    isModalOpen,
  };
}