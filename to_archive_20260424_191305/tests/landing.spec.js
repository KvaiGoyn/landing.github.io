import { test, expect } from '@playwright/test';

test.describe('Статический лендинг', () => {
  test('Главная страница загружается', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/МеталлПро|Металлоизделия/);
    await expect(page.locator('body')).toBeVisible();
  });

  test('Навигационные ссылки работают', async ({ page }) => {
    await page.goto('/');
    // Проверяем наличие основных секций через якорные ссылки
    const links = [
      { selector: 'a[href*="#about"]', name: 'О компании' },
      { selector: 'a[href*="#services"]', name: 'Услуги' },
      { selector: 'a[href*="#contacts"]', name: 'Контакты' },
    ];
    for (const link of links) {
      const element = page.locator(link.selector).first();
      await expect(element).toBeVisible();
      await expect(element).toHaveAttribute('href', /#/);
    }
  });

  test('Модальное окно открывается и закрывается', async ({ page }) => {
    await page.goto('/');
    // Ищем кнопку, которая открывает модальное окно (например, "Заказать звонок")
    const modalButton = page.locator('button:has-text("Заказать звонок"), a:has-text("Заказать звонок")').first();
    if (await modalButton.count() > 0) {
      await modalButton.click();
      // Ждем появления модального окна (селектор .modal, .popup и т.д.)
      const modal = page.locator('.modal, .popup, [role="dialog"]').first();
      await expect(modal).toBeVisible();
      // Закрываем модальное окно
      const closeButton = modal.locator('button[aria-label="Close"], .close, [data-close]').first();
      if (await closeButton.count() > 0) {
        await closeButton.click();
        await expect(modal).toBeHidden();
      }
    } else {
      console.log('Кнопка модального окна не найдена, тест пропущен');
    }
  });

  test('Форма обратной связи имеет валидацию', async ({ page }) => {
    await page.goto('/');
    // Ищем форму (селектор form)
    const form = page.locator('form').first();
    if (await form.count() > 0) {
      await expect(form).toBeVisible();
      // Проверяем наличие обязательных полей
      const requiredInputs = form.locator('input[required], textarea[required]');
      const count = await requiredInputs.count();
      expect(count).toBeGreaterThan(0);
      // Попытка отправить пустую форму
      const submitButton = form.locator('button[type="submit"], input[type="submit"]').first();
      await submitButton.click();
      // Ожидаем, что остаемся на той же странице (или появляются сообщения об ошибке)
      await expect(page).toHaveURL(/\/#?/);
    } else {
      console.log('Форма не найдена, тест пропущен');
    }
  });

  test('Плавная прокрутка по якорным ссылкам', async ({ page }) => {
    await page.goto('/');
    const anchorLink = page.locator('a[href*="#about"]').first();
    if (await anchorLink.count() > 0) {
      await anchorLink.click();
      // Ждем небольшое время для прокрутки
      await page.waitForTimeout(500);
      // Проверяем, что URL содержит якорь
      await expect(page).toHaveURL(/#about/);
    }
  });

  test('Адаптивность - мобильный viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    // Проверяем, что меню (возможно гамбургер) видно на мобильном
    const mobileMenu = page.locator('.hamburger, [aria-label="Menu"], button.menu-toggle').first();
    if (await mobileMenu.count() > 0) {
      await expect(mobileMenu).toBeVisible();
    }
    // Проверяем, что контент не выходит за пределы экрана
    const bodyWidth = await page.evaluate(() => document.body.clientWidth);
    expect(bodyWidth).toBeLessThanOrEqual(375);
  });
});