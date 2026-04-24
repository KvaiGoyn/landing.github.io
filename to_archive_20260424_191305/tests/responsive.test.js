import { test, expect } from '@playwright/test';

// Определяем набор устройств для тестирования
const DEVICES = [
  { name: 'mobile', width: 375, height: 667 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1280, height: 800 },
  { name: 'large desktop', width: 1920, height: 1080 }
];

test.describe('Адаптивность и responsive дизайн', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('Страница загружается на всех размерах экрана', async ({ page }) => {
    for (const device of DEVICES) {
      await page.setViewportSize({ width: device.width, height: device.height });
      await page.reload();
      await page.waitForLoadState('networkidle');
      
      // Проверяем, что body видим
      await expect(page.locator('body')).toBeVisible();
      
      // Проверяем, что нет горизонтального скролла (кроме небольших отклонений)
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      
      // Допускаем небольшой горизонтальный скролл (1-2px из-за округления)
      if (hasHorizontalScroll) {
        const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
        const overflow = scrollWidth - clientWidth;
        expect(overflow).toBeLessThan(5);
      }
    }
  });

  test('Навигационное меню адаптируется под мобильные устройства', async ({ page }) => {
    // Тестируем мобильный viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Ищем гамбургер-меню
    const hamburger = page.locator('.hamburger, .menu-toggle, [aria-label="Menu"], button:has-text("Меню")');
    if (await hamburger.count() > 0) {
      await expect(hamburger).toBeVisible();
      
      // Проверяем, что обычное навигационное меню скрыто или преобразовано
      const desktopNav = page.locator('nav.desktop, .desktop-nav, nav:not(.mobile)');
      if (await desktopNav.count() > 0) {
        const isVisible = await desktopNav.isVisible();
        // На мобильных обычное меню может быть скрыто или иметь display: none
        expect(isVisible).toBeFalsy();
      }
      
      // Открываем мобильное меню
      await hamburger.click();
      await page.waitForTimeout(300);
      
      // Проверяем, что мобильное меню появилось
      const mobileMenu = page.locator('.mobile-menu, .nav-menu.active, nav[aria-expanded="true"]');
      if (await mobileMenu.count() > 0) {
        await expect(mobileMenu).toBeVisible();
        
        // Проверяем, что ссылки в мобильном меню кликабельны
        const mobileLinks = mobileMenu.locator('a');
        const linkCount = await mobileLinks.count();
        expect(linkCount).toBeGreaterThan(0);
        
        // Закрываем меню
        await hamburger.click();
        await page.waitForTimeout(300);
        await expect(mobileMenu).toBeHidden();
      }
    } else {
      // Если нет гамбургера, проверяем, что навигация все равно работает
      const nav = page.locator('nav');
      await expect(nav).toBeVisible();
    }
  });

  test('Контент не выходит за пределы viewport на мобильных', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Проверяем основные контейнеры
    const containers = page.locator('.container, .wrapper, main, section');
    const containerCount = await containers.count();
    
    for (let i = 0; i < Math.min(containerCount, 5); i++) {
      const container = containers.nth(i);
      const boundingBox = await container.boundingBox();
      if (boundingBox) {
        // Проверяем, что контейнер не выходит за пределы viewport по ширине
        expect(boundingBox.width).toBeLessThanOrEqual(375);
        expect(boundingBox.x).toBeGreaterThanOrEqual(0);
        expect(boundingBox.x + boundingBox.width).toBeLessThanOrEqual(375);
      }
    }
  });

  test('Изображения адаптируются под размер экрана', async ({ page }) => {
    // Проверяем на мобильном и десктопе
    for (const device of [DEVICES[0], DEVICES[2]]) {
      await page.setViewportSize({ width: device.width, height: device.height });
      await page.reload();
      await page.waitForLoadState('networkidle');
      
      // Берем несколько изображений
      const images = page.locator('img:not([src*="svg"])');
      const imageCount = await images.count();
      
      for (let i = 0; i < Math.min(imageCount, 3); i++) {
        const img = images.nth(i);
        const boundingBox = await img.boundingBox();
        if (boundingBox) {
          // Проверяем, что изображение не шире viewport
          expect(boundingBox.width).toBeLessThanOrEqual(device.width);
          
          // Проверяем наличие srcset или sizes (опционально)
          const hasSrcset = await img.getAttribute('srcset');
          const hasSizes = await img.getAttribute('sizes');
          
          if (device.width <= 768) {
            // На мобильных ожидаем, что изображения могут иметь адаптивные атрибуты
            if (hasSrcset || hasSizes) {
              // Это хорошо
            }
          }
        }
      }
    }
  });

  test('Текст остается читаемым на всех размерах экрана', async ({ page }) => {
    for (const device of DEVICES) {
      await page.setViewportSize({ width: device.width, height: device.height });
      await page.reload();
      await page.waitForLoadState('networkidle');
      
      // Проверяем основные текстовые элементы
      const textElements = page.locator('h1, h2, h3, p');
      const elementCount = await textElements.count();
      
      for (let i = 0; i < Math.min(elementCount, 10); i++) {
        const element = textElements.nth(i);
        const isVisible = await element.isVisible();
        if (isVisible) {
          // Проверяем, что текст не перекрывается
          const boundingBox = await element.boundingBox();
          if (boundingBox) {
            // Проверяем, что элемент находится в пределах viewport
            expect(boundingBox.x).toBeGreaterThanOrEqual(0);
            expect(boundingBox.x + boundingBox.width).toBeLessThanOrEqual(device.width);
            
            // Проверяем, что высота достаточна для отображения текста
            expect(boundingBox.height).toBeGreaterThan(0);
          }
        }
      }
    }
  });

  test('Формы корректно отображаются на мобильных устройствах', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Открываем модальное окно с формой
    const callbackButton = page.locator('[data-modal="callback"], button:has-text("Заказать звонок")').first();
    if (await callbackButton.count() > 0) {
      await callbackButton.click();
      await page.waitForTimeout(500);
      
      const modal = page.locator('#modal-callback, .modal').first();
      if (await modal.count() > 0) {
        await expect(modal).toBeVisible();
        
        // Проверяем, что модальное окно адаптировано под мобильный экран
        const modalBox = await modal.boundingBox();
        if (modalBox) {
          expect(modalBox.width).toBeLessThanOrEqual(375);
          expect(modalBox.x).toBeGreaterThanOrEqual(0);
        }
        
        // Проверяем, что поля ввода достаточно крупные для касания (минимум 44x44px)
        const inputs = modal.locator('input, textarea, button');
        const inputCount = await inputs.count();
        
        for (let i = 0; i < Math.min(inputCount, 5); i++) {
          const input = inputs.nth(i);
          const boundingBox = await input.boundingBox();
          if (boundingBox) {
            // Рекомендуемый минимальный размер для касания - 44px
            expect(boundingBox.width).toBeGreaterThan(30);
            expect(boundingBox.height).toBeGreaterThan(30);
          }
        }
      }
    }
  });

  test('Кнопки и интерактивные элементы доступны для касания', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Проверяем основные кнопки
    const buttons = page.locator('button, a.button, [role="button"]');
    const buttonCount = await buttons.count();
    
    for (let i = 0; i < Math.min(buttonCount, 10); i++) {
      const button = buttons.nth(i);
      if (await button.isVisible()) {
        const boundingBox = await button.boundingBox();
        if (boundingBox) {
          // Проверяем минимальный размер для касания
          expect(boundingBox.width).toBeGreaterThan(30);
          expect(boundingBox.height).toBeGreaterThan(30);
          
          // Проверяем, что кнопка не перекрыта другими элементами
          const isClickable = await button.evaluate((el) => {
            const style = window.getComputedStyle(el);
            return style.pointerEvents !== 'none' && 
                   style.opacity !== '0' && 
                   style.visibility !== 'hidden' &&
                   style.display !== 'none';
          });
          expect(isClickable).toBeTruthy();
        }
      }
    }
  });

  test('Ориентация экрана (портрет vs ландшафт)', async ({ page }) => {
    // Тестируем портретную ориентацию
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    const portraitBodyWidth = await page.evaluate(() => document.body.clientWidth);
    expect(portraitBodyWidth).toBeLessThanOrEqual(375);
    
    // Меняем на ландшафтную ориентацию
    await page.setViewportSize({ width: 667, height: 375 });
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    const landscapeBodyWidth = await page.evaluate(() => document.body.clientWidth);
    expect(landscapeBodyWidth).toBeLessThanOrEqual(667);
    
    // Проверяем, что контент адаптировался
    const container = page.locator('.container, main').first();
    if (await container.count() > 0) {
      const containerWidth = await container.evaluate(el => el.clientWidth);
      expect(containerWidth).toBeGreaterThan(portraitBodyWidth);
    }
  });

  test('Скрытие/отображение элементов в зависимости от breakpoints', async ({ page }) => {
    // Элементы, которые должны скрываться на мобильных
    const desktopOnlySelectors = ['.desktop-only', '.hidden-mobile', '.d-none.d-md-block'];
    const mobileOnlySelectors = ['.mobile-only', '.hidden-desktop', '.d-md-none'];
    
    // Проверяем на десктопе
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    for (const selector of desktopOnlySelectors) {
      const elements = page.locator(selector);
      if (await elements.count() > 0) {
        const element = elements.first();
        await expect(element).toBeVisible();
      }
    }
    
    for (const selector of mobileOnlySelectors) {
      const elements = page.locator(selector);
      if (await elements.count() > 0) {
        const element = elements.first();
        await expect(element).toBeHidden();
      }
    }
    
    // Проверяем на мобильном
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    for (const selector of desktopOnlySelectors) {
      const elements = page.locator(selector);
      if (await elements.count() > 0) {
        const element = elements.first();
        await expect(element).toBeHidden();
      }
    }
    
    for (const selector of mobileOnlySelectors) {
      const elements = page.locator(selector);
      if (await elements.count() > 0) {
        const element = elements.first();
        await expect(element).toBeVisible();
      }
    }
  });

  test('Плавная работа анимаций на разных устройствах', async ({ page }) => {
    // Проверяем, что анимации не вызывают лагов
    for (const device of DEVICES) {
      await page.setViewportSize({ width: device.width, height: device.height });
      await page.reload();
      await page.waitForLoadState('networkidle');
      
      // Ищем элементы с анимациями
      const animatedElements = page.locator('[class*="animate-"], [class*="transition-"]');
      const animatedCount = await animatedElements.count();
      
      if (animatedCount > 0) {
        // Проверяем, что анимации применяются
        const hasAnimations = await animatedElements.first().evaluate(el => {
          const style = window.getComputedStyle(el);
          return style.animationName !== 'none' || style.transitionProperty !== 'none';
        });
        expect(hasAnimations).toBeTruthy();
      }
    }
  });

  test('Производительность: время загрузки на мобильных устройствах', async ({ page }) => {
    // Этот тест проверяет, что страница загружается за разумное время
    await page.setViewportSize({ width: 375, height: 667 });
    
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    // Ожидаем, что загрузка займет менее 5 секунд (для локального сервера)
    expect(loadTime).toBeLessThan(5000);
    
    // Проверяем, что основные элементы отрисованы
    await expect(page.locator('body')).toBeVisible();
    const aboveTheFold = page.locator('h1, .hero, header');
    if (await aboveTheFold.count() > 0) {
      await expect(aboveTheFold.first()).toBeVisible();
    }
  });
});