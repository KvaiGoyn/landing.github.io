'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

// Типы для фильтров портфолио
export type PortfolioFilter =
  | 'all'
  | 'Решётки'
  | 'Перила и лестницы'
  | 'Козырьки и навесы'
  | 'Ворота и заборы'
  | 'other';

// Состояние фильтров
export interface FilterState {
  activePortfolioFilter: PortfolioFilter;
}

// Контекст фильтров
export interface FilterContextType {
  state: FilterState;
  setFilter: (filter: PortfolioFilter) => void;
  resetFilter: () => void;
}

// Начальное состояние
const initialState: FilterState = {
  activePortfolioFilter: 'all',
};

// Создание контекста
const FilterContext = createContext<FilterContextType | undefined>(undefined);

// Провайдер контекста
export function FilterProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<FilterState>(initialState);

  // Установка фильтра
  const setFilter = useCallback((filter: PortfolioFilter) => {
    setState({
      activePortfolioFilter: filter,
    });
  }, []);

  // Сброс фильтра
  const resetFilter = useCallback(() => {
    setState({
      activePortfolioFilter: 'all',
    });
  }, []);

  const value: FilterContextType = {
    state,
    setFilter,
    resetFilter,
  };

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
}

// Хук для использования контекста фильтров
export function useFilterContext() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilterContext must be used within a FilterProvider');
  }
  return context;
}

// Удобный хук для работы с фильтрами портфолио
export function usePortfolioFilter() {
  const { state, setFilter, resetFilter } = useFilterContext();
  return {
    activeFilter: state.activePortfolioFilter,
    setFilter,
    resetFilter,
  };
}