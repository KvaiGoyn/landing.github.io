import { ReactNode } from 'react';

export interface CarouselProps {
  /** Дочерние элементы (слайды) */
  children: ReactNode[];
  /** Количество видимых слайдов одновременно (по умолчанию 1) */
  visibleSlides?: number;
  /** Интервал автоматического переключения в миллисекундах (0 для отключения) */
  autoPlayInterval?: number;
  /** Зациклить карусель (бесконечная прокрутка) */
  loop?: boolean;
  /** Показывать кнопки навигации (вперёд/назад) */
  showNavigation?: boolean;
  /** Показывать индикаторы (точки) */
  showIndicators?: boolean;
  /** Дополнительные классы для контейнера */
  className?: string;
  /** Callback при изменении текущего слайда */
  onSlideChange?: (index: number) => void;
  /** Начальный активный индекс */
  initialIndex?: number;
}

export interface CarouselSlideProps {
  /** Дочерний элемент слайда */
  children: ReactNode;
  /** Дополнительные классы */
  className?: string;
  /** Ширина слайда (обычно управляется каруселью) */
  width?: string;
}