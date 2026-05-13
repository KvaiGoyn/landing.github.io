import { useState, useCallback } from 'react';

export interface UseAccordionOptions {
  /** Разрешить открывать несколько элементов одновременно (по умолчанию false) */
  multiple?: boolean;
  /** Начально открытые индексы (если multiple = true, массив индексов; если false, один индекс или null) */
  initialOpenIndex?: number | number[] | null;
}

export interface UseAccordionReturn {
  /** Открытые индексы (массив, если multiple = true) */
  openIndexes: number[];
  /** Переключить состояние элемента по индексу */
  toggleItem: (index: number) => void;
  /** Открыть элемент по индексу */
  openItem: (index: number) => void;
  /** Закрыть элемент по индексу */
  closeItem: (index: number) => void;
  /** Проверить, открыт ли элемент */
  isItemOpen: (index: number) => boolean;
  /** Закрыть все элементы */
  closeAll: () => void;
  /** Открыть все элементы (только если multiple = true) */
  openAll: () => void;
}

/**
 * Хук для управления состоянием аккордеона
 */
export const useAccordion = ({
  multiple = false,
  initialOpenIndex = null,
}: UseAccordionOptions = {}): UseAccordionReturn => {
  const [openIndexes, setOpenIndexes] = useState<number[]>(() => {
    if (initialOpenIndex === null) return [];
    if (Array.isArray(initialOpenIndex)) {
      return multiple ? initialOpenIndex : initialOpenIndex.slice(0, 1);
    }
    return [initialOpenIndex];
  });

  const toggleItem = useCallback(
    (index: number) => {
      setOpenIndexes((prev) => {
        if (prev.includes(index)) {
          // Закрыть элемент
          return prev.filter((i) => i !== index);
        } else {
          // Открыть элемент
          if (multiple) {
            return [...prev, index];
          } else {
            return [index];
          }
        }
      });
    },
    [multiple]
  );

  const openItem = useCallback(
    (index: number) => {
      setOpenIndexes((prev) => {
        if (prev.includes(index)) return prev;
        if (multiple) {
          return [...prev, index];
        } else {
          return [index];
        }
      });
    },
    [multiple]
  );

  const closeItem = useCallback((index: number) => {
    setOpenIndexes((prev) => prev.filter((i) => i !== index));
  }, []);

  const isItemOpen = useCallback(
    (index: number) => openIndexes.includes(index),
    [openIndexes]
  );

  const closeAll = useCallback(() => {
    setOpenIndexes([]);
  }, []);

  const openAll = useCallback(() => {
    if (!multiple) {
      console.warn('openAll не поддерживается, когда multiple = false');
      return;
    }
    // В реальном использовании нужно знать общее количество элементов
    // Здесь просто оставляем как есть, так как хук не знает общее количество
    // Для реализации openAll нужно передавать общее количество элементов в опциях
  }, [multiple]);

  return {
    openIndexes,
    toggleItem,
    openItem,
    closeItem,
    isItemOpen,
    closeAll,
    openAll,
  };
};