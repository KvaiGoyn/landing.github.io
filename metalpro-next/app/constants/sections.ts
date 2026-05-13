/**
 * Константы ID секций сайта для навигации
 * Используются для плавного скролла и ссылок
 */

export const SECTION_IDS = {
  // Основные секции
  HERO: 'hero',
  SERVICES: 'services',
  ADVANTAGES: 'advantages',
  PORTFOLIO: 'portfolio',
  PRICING: 'pricing',
  CONTACTS: 'contacts',
  
  // Дополнительные секции
  TESTIMONIALS: 'testimonials',
  PARTNERS: 'partners',
  FAQ: 'faq',
} as const;

/**
 * Тип ID секции
 */
export type SectionId = typeof SECTION_IDS[keyof typeof SECTION_IDS];

/**
 * Названия секций для отображения
 */
export const SECTION_NAMES: Record<SectionId, string> = {
  [SECTION_IDS.HERO]: 'Главная',
  [SECTION_IDS.SERVICES]: 'Услуги',
  [SECTION_IDS.ADVANTAGES]: 'Преимущества',
  [SECTION_IDS.PORTFOLIO]: 'Портфолио',
  [SECTION_IDS.PRICING]: 'Цены',
  [SECTION_IDS.CONTACTS]: 'Контакты',
  [SECTION_IDS.TESTIMONIALS]: 'Отзывы',
  [SECTION_IDS.PARTNERS]: 'Партнеры',
  [SECTION_IDS.FAQ]: 'Вопросы и ответы',
};

/**
 * Проверяет, существует ли секция с указанным ID
 */
export function isValidSectionId(id: string): id is SectionId {
  return Object.values(SECTION_IDS).includes(id as SectionId);
}

/**
 * Возвращает ID секции по названию (регистронезависимо)
 */
export function getSectionIdByName(name: string): SectionId | null {
  const normalized = name.toLowerCase().trim();
  for (const [key, value] of Object.entries(SECTION_NAMES)) {
    if (value.toLowerCase() === normalized) {
      return key as SectionId;
    }
  }
  return null;
}

/**
 * Генерирует хеш для секции (с #)
 */
export function getSectionHash(sectionId: SectionId): string {
  return `#${sectionId}`;
}

/**
 * Возвращает offset для скролла с учетом фиксированного header
 * @param headerHeight Высота header в пикселях (по умолчанию 80)
 */
export function getScrollOffset(headerHeight: number = 80): number {
  return headerHeight;
}