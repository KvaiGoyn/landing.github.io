import { ReactNode } from 'react';

export interface AccordionProps {
  /** Дочерние элементы AccordionItem */
  children: ReactNode;
  /** Разрешить открывать несколько элементов одновременно */
  multiple?: boolean;
  /** Начально открытые индексы (если multiple = true, массив индексов; если false, один индекс или null) */
  defaultOpenIndex?: number | number[] | null;
  /** Дополнительные классы для контейнера */
  className?: string;
  /** Callback при изменении открытых элементов */
  onOpenChange?: (openIndexes: number[]) => void;
}

export interface AccordionItemProps {
  /** Заголовок элемента аккордеона */
  title: ReactNode;
  /** Контент элемента аккордеона */
  children: ReactNode;
  /** Индекс элемента (автоматически устанавливается Accordion) */
  index?: number;
  /** Дополнительные классы для элемента */
  className?: string;
  /** Дополнительные классы для заголовка */
  headerClassName?: string;
  /** Дополнительные классы для контента */
  contentClassName?: string;
  /** Иконка раскрытия (можно кастомизировать) */
  icon?: ReactNode;
  /** Отключить анимацию */
  disableAnimation?: boolean;
}