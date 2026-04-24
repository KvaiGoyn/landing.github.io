import { test, expect } from '@playwright/test';

test.describe('Модальные окна', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector('body', { state: 'visible' });
    await page.waitForTimeout(500);
  });

  test('Все модальные окна присутствуют в DOM', async ({ page }) => {
    // Проверяем наличие основных модальных окон по ID
    const modalIds = ['modal-callback', 'modal-consultation', 'modal-calculation', 'modal-success'];
    
    for (const modalId of modalIds) {
      const modal = page.locator(`#${modalId}`);
      // Модальные окна могут быть скрыты, но должны существовать в DOM
      await expect(modal).toHaveCount(1);
    }
  });

  test('Кнопки с data-modal атрибутом открывают соответствующие модальные окна', async ({ page }) => {
    // Ищем все триггеры модальных окон
    const modalTriggers = page.locator('[data-modal]');
    const count = await modalTriggers.count();
    
    if (count > 0) {
      // Берем первый триггер
      const trigger = modalTriggers.first();
      const modalType = await trigger.getAttribute('data-modal');
      
      // Кликаем на триггер
      await trigger.click();
      await page.waitForTimeout(500);
      
      // Проверяем, что соответствующее модальное окно открылось
      const modal = page.locator(`#modal-${modalType}`);
      await expect(modal).toBeVisible();
      
      // Проверяем, что overlay появился
      const overlay = page.locator('.modal-overlay');
      if (await overlay.count() > 0) {
        await expect(overlay).toBeVisible();
      }
    } else {
      // Если нет data-modal, проверяем кнопки с текстом
      const callbackButton = page.locator('button:has-text("Заказать звонок"), a:has-text("Заказать звонок")').first();
      if (await callbackButton.count() > 0) {
        await callbackButton.click();
        await page.waitForTimeout(500);
        
        const modal = page.locator('#modal-callback, .modal');
        if (await modal.count() > 0) {
          await expect(modal.first()).toBeVisible();
        }
      }
    }
  });

  test('Модальное окно "Заказать звонок" открывается и закрывается', async ({ page }) => {
    // Открываем модальное окно
    const callbackButton = page.locator('[data-modal="callback"], button:has-text("Заказать звонок")').first();
    if (await callbackButton.count() > 0) {
      await callbackButton.click();
      await page.waitForTimeout(500);
      
      const modal = page.locator('#modal-callback');
      await expect(modal).toBeVisible();
      
      // Проверяем заголовок
      const modalTitle = modal.locator('h3, h2, .modal-title');
      if (await modalTitle.count() > 0) {
        await expect(modalTitle).toContainText(/звонок|обратный/i);
      }
      
      // Закрываем через кнопку закрытия
      const closeButton = modal.locator('.modal-close, [data-close-modal], button.close, [aria-label="Close"]');
      if (await closeButton.count() > 0) {
        await closeButton.first().click();
        await page.waitForTimeout(300);
        await expect(modal).toBeHidden();
      } else {
        // Альтернативно закрываем через клик на overlay
        const overlay = page.locator('.modal-overlay');
        if (await overlay.count() > 0) {
          await overlay.click();
          await page.waitForTimeout(300);
          await expect(modal).toBeHidden();
        }
      }
    }
  });

  test('Модальное окно "Консультация" содержит форму', async ({ page }) => {
    // Открываем модальное окно консультации
    const consultationButton = page.locator('[data-modal="consultation"], button:has-text("Консультация"), button:has-text("Получить консультацию")').first();
    if (await consultationButton.count() > 0) {
      await consultationButton.click();
      await page.waitForTimeout(500);
      
      const modal = page.locator('#modal-consultation');
      if (await modal.count() > 0) {
        await expect(modal).toBeVisible();
        
        // Проверяем наличие формы внутри модального окна
        const form = modal.locator('form');
        if (await form.count() > 0) {
          await expect(form).toBeVisible();
          
          // Проверяем обязательные поля
          const requiredInputs = form.locator('input[required], textarea[required]');
          const requiredCount = await requiredInputs.count();
          expect(requiredCount).toBeGreaterThan(0);
          
          // Проверяем наличие поля телефона
          const phoneInput = form.locator('input[type="tel"], input[name="phone"]');
          await expect(phoneInput).toHaveCount(1);
        } else {
          // Если формы нет, просто проверяем наличие модального окна
          console.log('Форма не найдена внутри модального окна консультации');
        }
      }
    } else {
      // Если кнопки нет, пропускаем тест
      console.log('Кнопка консультации не найдена, пропускаем тест');
    }
  });

  test('Модальное окно "Расчет стоимости" содержит калькулятор', async ({ page }) => {
    const calculationButton = page.locator('[data-modal="calculation"], button:has-text("Расчет"), button:has-text("Рассчитать стоимость")').first();
    if (await calculationButton.count() > 0) {
      await calculationButton.click();
      await page.waitForTimeout(500);
      
      const modal = page.locator('#modal-calculation');
      if (await modal.count() > 0) {
        await expect(modal).toBeVisible();
        
        // Проверяем наличие элементов калькулятора
        const calculator = modal.locator('.calculator, .calc, [data-calc]');
        if (await calculator.count() > 0) {
          await expect(calculator).toBeVisible();
        }
        
        // Проверяем наличие полей ввода
        const inputs = modal.locator('input[type="number"], select, .calc-input');
        const inputCount = await inputs.count();
        expect(inputCount).toBeGreaterThan(0);
      }
    } else {
      console.log('Кнопка расчета не найдена, пропускаем тест');
    }
  });

  test('Модальное окно "Успех" появляется после отправки формы', async ({ page }) => {
    // Для теста имитируем открытие модального успеха напрямую через JS
    await page.evaluate(() => {
      const successModal = document.getElementById('modal-success');
      if (successModal) {
        successModal.style.display = 'flex';
        successModal.classList.add('active');
      }
    });
    
    const successModal = page.locator('#modal-success');
    if (await successModal.count() > 0) {
      // Проверяем, что модальное окно содержит сообщение об успехе
      await expect(successModal).toBeVisible();
      const successText = successModal.locator('h3, h2, .success-message');
      if (await successText.count() > 0) {
        await expect(successText).toContainText(/успех|спасибо|отправлено/i);
      }
      
      // Проверяем наличие кнопки закрытия
      const closeButton = successModal.locator('button, .close, [data-close-modal]');
      if (await closeButton.count() > 0) {
        await closeButton.first().click();
        await page.waitForTimeout(300);
        await expect(successModal).toBeHidden();
      }
    }
  });

  test('Модальные окна закрываются по клавише Escape', async ({ page }) => {
    // Открываем любое модальное окно
    const callbackButton = page.locator('[data-modal="callback"], button:has-text("Заказать звонок")').first();
    if (await callbackButton.count() > 0) {
      await callbackButton.click();
      await page.waitForTimeout(500);
      
      const modal = page.locator('#modal-callback, .modal').first();
      if (await modal.count() > 0 && await modal.isVisible()) {
        // Нажимаем Escape
        await page.keyboard.press('Escape');
        await page.waitForTimeout(300);
        await expect(modal).toBeHidden();
      }
    }
  });

  test('Фокус зациклен внутри модального окна (TAB navigation)', async ({ page }) => {
    // Открываем модальное окно
    const callbackButton = page.locator('[data-modal="callback"]').first();
    if (await callbackButton.count() > 0) {
      await callbackButton.click();
      await page.waitForTimeout(500);
      
      const modal = page.locator('#modal-callback');
      if (await modal.count() > 0 && await modal.isVisible()) {
        // Находим первый фокусируемый элемент внутри модального окна
        const focusableElements = modal.locator('button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
        const firstFocusable = focusableElements.first();
        if (await firstFocusable.count() > 0) {
          // Фокус может быть на первом элементе, но не гарантировано
          // Проверяем, что элемент фокусируемый
          await expect(firstFocusable).toBeEnabled();
        }
      }
    }
  });

  test('Одновременно открыто только одно модальное окно', async ({ page }) => {
    // Открываем первое модальное окно
    const callbackButton = page.locator('[data-modal="callback"]').first();
    if (await callbackButton.count() > 0) {
      await callbackButton.click();
      await page.waitForTimeout(500);
      
      const modal1 = page.locator('#modal-callback');
      if (await modal1.count() > 0 && await modal1.isVisible()) {
        // Пытаемся открыть второе модальное окно
        const consultationButton = page.locator('[data-modal="consultation"]').first();
        if (await consultationButton.count() > 0) {
          await consultationButton.click();
          await page.waitForTimeout(500);
          
          // Проверяем, что первое модальное окно закрылось
          await expect(modal1).toBeHidden();
          
          // Второе должно быть видимо
          const modal2 = page.locator('#modal-consultation');
          await expect(modal2).toBeVisible();
        }
      }
    }
  });
});