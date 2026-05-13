import { useState, useEffect, useCallback } from 'react';

export interface UseCarouselOptions {
  /** Количество элементов в карусели */
  itemCount: number;
  /** Начальный активный индекс (по умолчанию 0) */
  initialIndex?: number;
  /** Интервал автоматического переключения в миллисекундах (0 или undefined для отключения) */
  autoPlayInterval?: number;
  /** Зациклить карусель (бесконечная прокрутка) */
  loop?: boolean;
  /** Количество видимых слайдов одновременно (по умолчанию 1) */
  visibleSlides?: number;
}

export interface UseCarouselReturn {
  /** Текущий активный индекс */
  currentIndex: number;
  /** Перейти к следующему слайду */
  next: () => void;
  /** Перейти к предыдущему слайду */
  prev: () => void;
  /** Перейти к конкретному индексу */
  goTo: (index: number) => void;
  /** Установить автоматическое переключение */
  setAutoPlay: (enabled: boolean) => void;
  /** Автоматическое переключение активно */
  isAutoPlaying: boolean;
  /** Общее количество слайдов */
  totalSlides: number;
}

/**
 * Хук для управления каруселью/слайдером
 */
export const useCarousel = ({
  itemCount,
  initialIndex = 0,
  autoPlayInterval = 5000,
  loop = true,
  visibleSlides = 1,
}: UseCarouselOptions): UseCarouselReturn => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlayInterval > 0);

  const totalSlides = itemCount;

  const next = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev >= totalSlides - visibleSlides) {
        return loop ? 0 : prev;
      }
      return prev + 1;
    });
  }, [totalSlides, visibleSlides, loop]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev <= 0) {
        return loop ? totalSlides - visibleSlides : prev;
      }
      return prev - 1;
    });
  }, [totalSlides, visibleSlides, loop]);

  const goTo = useCallback((index: number) => {
    if (index >= 0 && index <= totalSlides - visibleSlides) {
      setCurrentIndex(index);
    } else if (loop) {
      // Для зацикленной карусели разрешаем любой индекс с модулем
      const adjustedIndex = ((index % totalSlides) + totalSlides) % totalSlides;
      setCurrentIndex(adjustedIndex);
    }
  }, [totalSlides, visibleSlides, loop]);

  const setAutoPlay = useCallback((enabled: boolean) => {
    setIsAutoPlaying(enabled);
  }, []);

  // Автоматическое переключение
  useEffect(() => {
    if (!isAutoPlaying || autoPlayInterval <= 0) return;

    const interval = setInterval(() => {
      next();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, autoPlayInterval, next]);

  return {
    currentIndex,
    next,
    prev,
    goTo,
    setAutoPlay,
    isAutoPlaying,
    totalSlides,
  };
};