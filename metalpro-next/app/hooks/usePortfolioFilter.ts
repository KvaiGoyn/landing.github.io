import { useState, useMemo, useCallback } from 'react';

export interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  // Можно добавить поле category для явной фильтрации
  category?: string;
}

export interface UsePortfolioFilterOptions<T extends PortfolioItem> {
  /** Все элементы портфолио */
  items: T[];
  /** Начальная активная категория (по умолчанию 'all') */
  initialCategory?: string;
  /** Функция для определения категории элемента (по умолчанию использует поле category) */
  getCategory?: (item: T) => string;
  /** Доступные категории фильтров (по умолчанию определяются автоматически из items) */
  categories?: Array<{ id: string; label: string }>;
}

export interface UsePortfolioFilterReturn<T extends PortfolioItem> {
  /** Все элементы */
  allItems: T[];
  /** Отфильтрованные элементы по активной категории */
  filteredItems: T[];
  /** Активная категория */
  activeCategory: string;
  /** Установить активную категорию */
  setActiveCategory: (category: string) => void;
  /** Доступные категории фильтров */
  availableCategories: Array<{ id: string; label: string }>;
  /** Сбросить фильтр (установить 'all') */
  resetFilter: () => void;
  /** Проверить, активна ли категория */
  isCategoryActive: (category: string) => boolean;
}

/**
 * Хук для фильтрации портфолио по категориям
 */
export const usePortfolioFilter = <T extends PortfolioItem>({
  items,
  initialCategory = 'all',
  getCategory = (item) => item.category || 'uncategorized',
  categories,
}: UsePortfolioFilterOptions<T>): UsePortfolioFilterReturn<T> => {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);

  // Определяем доступные категории
  const availableCategories = useMemo(() => {
    if (categories) return categories;

    const categorySet = new Set<string>();
    items.forEach((item) => {
      const cat = getCategory(item);
      if (cat) categorySet.add(cat);
    });

    // Преобразуем в массив объектов с id и label
    return Array.from(categorySet).map((cat) => ({
      id: cat,
      label: cat,
    }));
  }, [items, getCategory, categories]);

  // Отфильтрованные элементы
  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return items;
    return items.filter((item) => getCategory(item) === activeCategory);
  }, [items, activeCategory, getCategory]);

  const resetFilter = useCallback(() => {
    setActiveCategory('all');
  }, []);

  const isCategoryActive = useCallback(
    (category: string) => activeCategory === category,
    [activeCategory]
  );

  return {
    allItems: items,
    filteredItems,
    activeCategory,
    setActiveCategory,
    availableCategories,
    resetFilter,
    isCategoryActive,
  };
};