'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { CarouselProps } from './Carousel.types';
import { carouselStyles } from './Carousel.styles';

/**
 * Компонент карусели для отображения слайдов с навигацией
 */
export const Carousel: React.FC<CarouselProps> = ({
  children,
  visibleSlides = 1,
  autoPlayInterval = 5000,
  loop = true,
  showNavigation = true,
  showIndicators = true,
  hideNavigationOnMobile = false,
  className = '',
  onSlideChange,
  initialIndex = 0,
}) => {
  const slides = React.Children.toArray(children);
  const totalSlides = slides.length;

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlayInterval > 0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const maxIndex = Math.max(0, totalSlides - visibleSlides);

  const next = useCallback(() => {
    setCurrentIndex(prev => {
      if (prev >= maxIndex) {
        return loop ? 0 : prev;
      }
      return prev + 1;
    });
  }, [maxIndex, loop]);

  const prev = useCallback(() => {
    setCurrentIndex(prev => {
      if (prev <= 0) {
        return loop ? maxIndex : prev;
      }
      return prev - 1;
    });
  }, [maxIndex, loop]);

  const goTo = useCallback((index: number) => {
    setCurrentIndex(Math.min(Math.max(0, index), maxIndex));
  }, [maxIndex]);

  const setAutoPlay = useCallback((playing: boolean) => {
    setIsAutoPlaying(playing);
  }, []);

  // Touch handlers for swipe
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        next();
      } else {
        prev();
      }
    }
  }, [next, prev]);

  // Автовоспроизведение
  useEffect(() => {
    if (autoPlayInterval > 0 && isAutoPlaying) {
      autoPlayRef.current = setInterval(next, autoPlayInterval);
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
    };
  }, [autoPlayInterval, isAutoPlaying, next]);

  // Вызываем callback при изменении слайда
  useEffect(() => {
    onSlideChange?.(currentIndex);
  }, [currentIndex, onSlideChange]);

  // Рассчитываем ширину слайда
  const slideWidth = `${100 / visibleSlides}%`;

  // Обработчики для паузы автовоспроизведения при наведении
  const handleMouseEnter = () => {
    if (autoPlayInterval > 0) {
      setAutoPlay(false);
    }
  };

  const handleMouseLeave = () => {
    if (autoPlayInterval > 0) {
      setAutoPlay(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`${carouselStyles.container} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Контейнер слайдов */}
      <div
        className={carouselStyles.slidesContainer}
        style={{
          transform: `translateX(-${currentIndex * (100 / visibleSlides)}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={carouselStyles.slide}
            style={{ width: slideWidth }}
          >
            {slide}
          </div>
        ))}
      </div>

      {/* Кнопки навигации */}
      {showNavigation && totalSlides > visibleSlides && (
        <div className={hideNavigationOnMobile ? 'hidden lg:block' : ''}>
          <button
            onClick={prev}
            className={`${carouselStyles.navigationButton} ${carouselStyles.navigationButtonPrev}`}
            aria-label="Предыдущий слайд"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7"></path>
            </svg>
          </button>
          <button
            onClick={next}
            className={`${carouselStyles.navigationButton} ${carouselStyles.navigationButtonNext}`}
            aria-label="Следующий слайд"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      )}

      {/* Индикаторы (точки) */}
      {showIndicators && totalSlides > 1 && (
        <div className={carouselStyles.indicatorsContainer}>
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`${carouselStyles.indicator} ${
                currentIndex === index ? carouselStyles.indicatorActive : ''
              }`}
              aria-label={`Перейти к слайду ${index + 1}`}
              aria-current={currentIndex === index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Компонент отдельного слайда карусели
 */
export const CarouselSlide: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <div className={`${carouselStyles.slide} ${className}`}>{children}</div>
  );
};