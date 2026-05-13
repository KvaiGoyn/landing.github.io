'use client';

import { useCallback } from 'react';

/**
 * Хук для плавного скролла к элементам по ID
 * @returns Объект с функцией scrollToSection
 */
export function useScrollTo() {
  /**
   * Плавно скроллит к элементу с указанным ID
   * @param sectionId ID элемента (без #)
   * @param options Опции скролла
   */
  const scrollToSection = useCallback((
    sectionId: string,
    options: ScrollIntoViewOptions = { behavior: 'smooth' }
  ) => {
    // Если передан хеш, убираем #
    const id = sectionId.startsWith('#') ? sectionId.slice(1) : sectionId;
    
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView(options);
      
      // Обновляем URL без перезагрузки страницы
      if (typeof window !== 'undefined') {
        window.history.pushState({}, '', `#${id}`);
      }

    }
  }, []);

  /**
   * Скролл к верхней части страницы
   */
  const scrollToTop = useCallback((options: ScrollIntoViewOptions = { behavior: 'smooth' }) => {
    window.scrollTo({
      top: 0,
      ...options,
    });
  }, []);

  /**
   * Скролл к элементу по селектору
   */
  const scrollToSelector = useCallback((
    selector: string,
    options: ScrollIntoViewOptions = { behavior: 'smooth' }
  ) => {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView(options);

    }
  }, []);

  return {
    scrollToSection,
    scrollToTop,
    scrollToSelector,
  };
}

/**
 * Хук для скролла к секциям с обработкой навигационных ссылок
 */
export function useNavigationScroll() {
  const { scrollToSection } = useScrollTo();

  /**
   * Обработчик клика по навигационной ссылке
   */
  const handleNavClick = useCallback((
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    console.log('handleNavClick called with sectionId:', sectionId);
    e.preventDefault();
    scrollToSection(sectionId);
  }, [scrollToSection]);

  return {
    handleNavClick,
    scrollToSection,
  };
}