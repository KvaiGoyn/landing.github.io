'use client';

import React, { useEffect } from 'react';
import { CarouselProps } from './Carousel.types';
import { carouselStyles } from './Carousel.styles';
import { useCarousel } from '@/app/hooks/useCarousel';

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
  className = '',
  onSlideChange,
  initialIndex = 0,
}) => {
  const slides = React.Children.toArray(children);
  const totalSlides = slides.length;

  const {
    currentIndex,
    next,
    prev,
    goTo,
    setAutoPlay,
    isAutoPlaying,
    totalSlides: hookTotalSlides,
  } = useCarousel({
    itemCount: totalSlides,
    initialIndex,
    autoPlayInterval,
    loop,
    visibleSlides,
  });

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
      className={`${carouselStyles.container} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
        <>
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
        </>
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

      {/* Индикатор автовоспроизведения (опционально) */}
      {autoPlayInterval > 0 && (
        <div className="absolute bottom-4 right-4 flex items-center gap-2 text-xs text-gray-500">
          <div
            className={`w-2 h-2 rounded-full ${
              isAutoPlaying ? 'bg-green-500' : 'bg-gray-300'
            }`}
          />
          <span>{isAutoPlaying ? 'Автопрокрутка' : 'Пауза'}</span>
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