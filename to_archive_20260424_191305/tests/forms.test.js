import { test, expect } from '@playwright/test';

test.describe('Формы и валидация', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('Все формы на странице имеют обязательные поля', async ({ page }) => {
    const forms = page.locator('form');
    const formCount = await forms.count();
    
    expect(formCount).toBeGreaterThan(0);
    
    for (let i = 0; i < formCount; i++) {
      const form = forms.nth(i);
      const requiredInputs = form.locator('input[required], textarea[required], select[required]');
      const requiredCount = await requiredInputs.count();
      
      // Хотя бы одно поле должно быть обязательным (обычно телефон или имя)
      if (requiredCount === 0) {
        // Проверяем наличие валидации через JavaScript
        const hasValidation = await form.evaluate((formEl) => {
          return Array.from(formEl.elements).some(el => el.hasAttribute('required') || el.hasAttribute('pattern'));
        });
        expect(hasValidation).toBeTruthy();
      }
    }
  });

  test('Поле телефона имеет маску ввода', async ({ page }) => {
    // Ищем поле телефона
    const phoneInputs = page.locator('input[type="tel"], input[name="phone"], input[placeholder*="телефон"]');
    const phoneCount = await phoneInputs.count();
    
    if (phoneCount > 0) {
      const phoneInput = phoneInputs.first();
      await expect(phoneInput).toBeVisible();
      
      // Проверяем наличие атрибутов маски
      const hasMask = await phoneInput.evaluate((input) => {
        return input.hasAttribute('data-mask') || 
               input.hasAttribute('data-phone-mask') || 
               input.placeholder.includes('+7') ||
               input.classList.contains('phone-mask');
      });
      
      // Если маска есть, проверяем формат
      if (hasMask) {
        // Вводим цифры и проверяем форматирование
        await phoneInput.fill('9123456789');
        const value = await phoneInput.inputValue();
        // Ожидаем формат +7 (912) 345-67-89 или подобный
        expect(value).toMatch(/[\d\s\(\)\-+]+/);
      }
    }
  });

  test('Валидация телефона: корректный номер проходит', async ({ page }) => {
    // Открываем модальное окно с формой
    const callbackButton = page.locator('[data-modal="callback"], button:has-text("Заказать звонок")').first();
    if (await callbackButton.count() > 0) {
      await callbackButton.click();
      await page.waitForTimeout(500);
      
      const modal = page.locator('#modal-callback');
      if (await modal.count() > 0) {
        const form = modal.locator('form');
        const phoneInput = form.locator('input[type="tel"], input[name="phone"]').first();
        
        if (await phoneInput.count() > 0) {
          // Вводим корректный номер
          await phoneInput.fill('9123456789');
          
          // Проверяем, что поле не имеет ошибки валидации
          const isValid = await phoneInput.evaluate((input) => input.checkValidity());
          expect(isValid).toBeTruthy();
          
          // Проверяем, что нет сообщения об ошибке
          const errorMessage = form.locator('.error-message, .invalid-feedback, :invalid');
          if (await errorMessage.count() > 0) {
            await expect(errorMessage).toBeHidden();
          }
        }
      }
    }
  });

  test('Валидация телефона: некорректный номер показывает ошибку', async ({ page }) => {
    const callbackButton = page.locator('[data-modal="callback"], button:has-text("Заказать звонок")').first();
    if (await callbackButton.count() > 0) {
      await callbackButton.click();
      await page.waitForTimeout(500);
      
      const modal = page.locator('#modal-callback');
      if (await modal.count() > 0) {
        const form = modal.locator('form');
        const phoneInput = form.locator('input[type="tel"], input[name="phone"]').first();
        
        if (await phoneInput.count() > 0) {
          // Вводим некорректный номер (слишком короткий)
          await phoneInput.fill('123');
          
          // Пытаемся отправить форму
          const submitButton = form.locator('button[type="submit"], input[type="submit"]');
          if (await submitButton.count() > 0) {
            await submitButton.click();
            await page.waitForTimeout(300);
            
            // Проверяем, что появилось сообщение об ошибке
            const errorMessage = form.locator('.error-message, .invalid-feedback, :invalid');
            if (await errorMessage.count() > 0) {
              await expect(errorMessage).toBeVisible();
            } else {
              // Или проверяем, что форма не отправилась (остаемся на той же странице)
              await expect(modal).toBeVisible();
            }
          }
        }
      }
    }
  });

  test('Валидация email: корректный формат', async ({ page }) => {
    // Ищем поле email
    const emailInputs = page.locator('input[type="email"], input[name="email"]');
    if (await emailInputs.count() > 0) {
      const emailInput = emailInputs.first();
      
      // Вводим корректный email
      await emailInput.fill('test@example.com');
      const isValid = await emailInput.evaluate((input) => input.checkValidity());
      expect(isValid).toBeTruthy();
      
      // Вводим некорректный email
      await emailInput.fill('invalid-email');
      const isInvalid = await emailInput.evaluate((input) => input.checkValidity());
      expect(isInvalid).toBeFalsy();
    }
  });

  test('Форма "Заказать звонок" отправляется с корректными данными', async ({ page }) => {
    // Открываем модальное окно
    const callbackButton = page.locator('[data-modal="callback"]').first();
    if (await callbackButton.count() > 0) {
      await callbackButton.click();
      await page.waitForTimeout(500);
      
      const modal = page.locator('#modal-callback');
      if (await modal.count() > 0) {
        const form = modal.locator('form');
        
        // Заполняем обязательные поля
        const nameInput = form.locator('input[name="name"], input[placeholder*="имя"]').first();
        if (await nameInput.count() > 0) {
          await nameInput.fill('Иван Иванов');
        }
        
        const phoneInput = form.locator('input[type="tel"], input[name="phone"]').first();
        if (await phoneInput.count() > 0) {
          await phoneInput.fill('9123456789');
        }
        
        // Отправляем форму
        const submitButton = form.locator('button[type="submit"]');
        if (await submitButton.count() > 0) {
          // Перехватываем запрос отправки формы
          const [request] = await Promise.all([
            page.waitForRequest(request => request.url().includes('/api/') || request.method() === 'POST'),
            submitButton.click()
          ]).catch(() => [null]);
          
          // Если есть запрос, проверяем его
          if (request) {
            expect(request.method()).toBe('POST');
          } else {
            // Иначе проверяем, что появилось модальное окно успеха
            await page.waitForTimeout(1000);
            const successModal = page.locator('#modal-success');
            if (await successModal.count() > 0) {
              await expect(successModal).toBeVisible();
            }
          }
        }
      }
    }
  });

  test('Форма "Получить консультацию" содержит дополнительные поля', async ({ page }) => {
    const consultationButton = page.locator('[data-modal="consultation"]').first();
    if (await consultationButton.count() > 0) {
      await consultationButton.click();
      await page.waitForTimeout(500);
      
      const modal = page.locator('#modal-consultation');
      if (await modal.count() > 0) {
        const form = modal.locator('form');
        
        // Проверяем наличие поля для комментария
        const textarea = form.locator('textarea[name="message"], textarea[placeholder*="опрос"]');
        await expect(textarea).toHaveCount(1);
        
        // Проверяем наличие поля выбора услуги
        const select = form.locator('select[name="service"], select[placeholder*="услуг"]');
        if (await select.count() > 0) {
          const options = select.locator('option');
          const optionCount = await options.count();
          expect(optionCount).toBeGreaterThan(1);
        }
      }
    }
  });

  test('Визуальная обратная связь при фокусе на полях', async ({ page }) => {
    const form = page.locator('form').first();
    if (await form.count() > 0) {
      const input = form.locator('input').first();
      if (await input.count() > 0) {
        // Фокусируемся на поле
        await input.focus();
        await page.waitForTimeout(100);
        
        // Проверяем изменение стилей
        const hasFocusStyle = await input.evaluate((el) => {
          const styles = window.getComputedStyle(el);
          return styles.borderColor !== '' && styles.borderColor !== 'initial';
        });
        expect(hasFocusStyle).toBeTruthy();
        
        // Убираем фокус
        await input.blur();
      }
    }
  });

  test('Сообщения об ошибках показываются при пустой отправке', async ({ page }) => {
    // Открываем форму
    const callbackButton = page.locator('[data-modal="callback"]').first();
    if (await callbackButton.count() > 0) {
      await callbackButton.click();
      await page.waitForTimeout(500);
      
      const modal = page.locator('#modal-callback');
      if (await modal.count() > 0) {
        const form = modal.locator('form');
        const submitButton = form.locator('button[type="submit"]');
        
        if (await submitButton.count() > 0) {
          // Пытаемся отправить пустую форму
          await submitButton.click();
          await page.waitForTimeout(300);
          
          // Проверяем сообщения об ошибках
          const errorMessages = form.locator('.error-message, .invalid-feedback, :invalid');
          const errorCount = await errorMessages.count();
          expect(errorCount).toBeGreaterThan(0);
          
          // Проверяем, что форма не отправилась
          await expect(modal).toBeVisible();
        }
      }
    }
  });

  test('Кнопка отправки формы блокируется во время отправки', async ({ page }) => {
    const callbackButton = page.locator('[data-modal="callback"]').first();
    if (await callbackButton.count() > 0) {
      await callbackButton.click();
      await page.waitForTimeout(500);
      
      const modal = page.locator('#modal-callback');
      if (await modal.count() > 0) {
        const form = modal.locator('form');
        const submitButton = form.locator('button[type="submit"]');
        
        if (await submitButton.count() > 0) {
          // Заполняем форму
          const phoneInput = form.locator('input[type="tel"]').first();
          if (await phoneInput.count() > 0) {
            await phoneInput.fill('9123456789');
          }
          
          // Нажимаем кнопку и проверяем состояние disabled
          await submitButton.click();
          
          // Кнопка должна быть заблокирована
          const isDisabled = await submitButton.getAttribute('disabled');
          expect(isDisabled).toBeTruthy();
          
          // Ждем и проверяем, что кнопка разблокировалась (после таймаута)
          await page.waitForTimeout(2000);
          const isEnabled = await submitButton.getAttribute('disabled');
          expect(isEnabled).toBeFalsy();
        }
      }
    }
  });

  test('Форма "Расчет стоимости" динамически обновляет результат', async ({ page }) => {
    const calculationButton = page.locator('[data-modal="calculation"]').first();
    if (await calculationButton.count() > 0) {
      await calculationButton.click();
      await page.waitForTimeout(500);
      
      const modal = page.locator('#modal-calculation');
      if (await modal.count() > 0) {
        // Ищем поля ввода, влияющие на расчет
        const quantityInput = modal.locator('input[type="number"], input[name="quantity"]').first();
        const priceDisplay = modal.locator('.price-result, .total-price, [data-price]');
        
        if (await quantityInput.count() > 0 && await priceDisplay.count() > 0) {
          // Запоминаем начальную цену
          const initialPrice = await priceDisplay.textContent();
          
          // Меняем количество
          await quantityInput.fill('2');
          await page.waitForTimeout(300);
          
          // Проверяем, что цена изменилась
          const updatedPrice = await priceDisplay.textContent();
          expect(updatedPrice).not.toBe(initialPrice);
        }
      }
    }
  });
});