# Руководство по тестированию Playwright

## Введение

Данное руководство предназначено для разработчиков, работающих над статическим лендингом Next.js. Оно содержит практические инструкции по настройке, запуску и поддержке автоматизированных тестов с использованием Playwright.

### Цели руководства
- Обеспечить единый подход к тестированию в команде
- Ускорить onboarding новых разработчиков
- Улучшить качество и стабильность тестов
- Создать основу для CI/CD интеграции

---

## Содержание

1. [Быстрый старт](#быстрый-старт)
2. [Настройка окружения](#настройка-окружения)
3. [Запуск тестов](#запуск-тестов)
4. [Интерпретация результатов](#интерпретация-результатов)
5. [Добавление новых тестов](#добавление-новых-тестов)
6. [Best Practices](#best-practices)
7. [Отладка и устранение проблем](#отладка-и-устранение-проблем)
8. [Интеграция с CI/CD](#интеграция-с-cicd)
9. [Часто задаваемые вопросы](#часто-задаваемые-вопросы)

---

## Быстрый старт

### Минимальные требования
- Node.js 18 или выше
- npm 9 или выше
- Git

### Установка за 5 минут

1. **Клонируйте репозиторий и перейдите в директорию проекта:**
   ```bash
   git clone <repository-url>
   cd landing_work
   ```

2. **Установите зависимости:**
   ```bash
   npm install
   ```

3. **Установите браузеры Playwright:**
   ```bash
   npx playwright install
   ```

4. **Запустите локальный сервер (в отдельном терминале):**
   ```bash
   npx serve -p 8080
   ```

5. **Запустите тесты:**
   ```bash
   npx playwright test
   ```

6. **Просмотрите отчет:**
   ```bash
   npx playwright show-report
   ```

---

## Настройка окружения

### Структура проекта
```
landing_work/
├── tests/                    # Тестовые файлы
│   ├── navigation.test.js    # Тесты навигации
│   ├── modals.test.js        # Тесты модальных окон
│   ├── forms.test.js         # Тесты форм
│   ├── responsive.test.js    # Тесты адаптивности
│   └── landing.spec.js       # Общие тесты лендинга
├── playwright.config.js      # Конфигурация Playwright
├── playwright-report/        # HTML отчеты
├── test-results/            # Результаты тестов (скриншоты, трассировки)
└── package.json             # Зависимости и скрипты
```

### Конфигурация Playwright

Основной конфигурационный файл `playwright.config.js` содержит:

```javascript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['list']
  ],
  
  use: {
    baseURL: 'http://localhost:8080',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'off',
  },
  
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
    { name: 'Mobile Safari', use: { ...devices['iPhone 12'] } },
  ],
  
  webServer: {
    command: 'npx serve -p 8080',
    url: 'http://localhost:8080',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
```

### Настройка для разработки

**Добавьте скрипты в `package.json`:**
```json
{
  "scripts": {
    "test": "playwright test",
    "test:ui": "playwright test --ui",
    "test:chromium": "playwright test --project=chromium",
    "test:firefox": "playwright test --project=firefox",
    "test:webkit": "playwright test --project=webkit",
    "test:mobile": "playwright test --project='Mobile Chrome' --project='Mobile Safari'",
    "test:debug": "playwright test --debug",
    "report": "playwright show-report",
    "install:browsers": "playwright install --with-deps"
  }
}
```

---

## Запуск тестов

### Базовые команды

| Команда | Описание |
|---------|----------|
| `npm test` | Запуск всех тестов |
| `npm run test:ui` | Запуск с интерактивным UI |
| `npm run test:chromium` | Только Chromium |
| `npm run test:firefox` | Только Firefox |
| `npm run test:webkit` | Только WebKit (Safari) |
| `npm run test:mobile` | Только мобильные тесты |
| `npm run test:debug` | Запуск в режиме отладки |
| `npm run report` | Открыть HTML отчет |

### Параметры командной строки

**Запуск конкретного файла:**
```bash
npx playwright test tests/forms.test.js
```

**Запуск конкретного теста:**
```bash
npx playwright test -g "валидация телефона"
```

**Запуск с определенным количеством воркеров:**
```bash
npx playwright test --workers=4
```

**Запуск с повторными попытками:**
```bash
npx playwright test --retries=3
```

**Запуск с генерацией трассировки:**
```bash
npx playwright test --trace=on
```

### Параллельный запуск

По умолчанию тесты запускаются параллельно. Для отключения:
```bash
npx playwright test --workers=1
```

---

## Интерпретация результатов

### Типы отчетов

1. **Консольный вывод (list reporter):**
   ```
   ✓ tests/navigation.test.js:12:3 › Навигация и якорные ссылки › Главная страница загружается с корректным заголовком (1.2s)
   ✘ tests/forms.test.js:89:7 › Формы и валидация › Валидация телефона: некорректный номер показывает ошибку (30.1s)
   ```

2. **HTML отчет:**
   ```bash
   npx playwright show-report
   ```
   Открывает интерактивный отчет в браузере с:
   - Детализацией по тестам
   - Скриншотами при падении
   - Трассировками выполнения
   - Логами и ошибками

3. **JUnit отчет (для CI):**
   ```bash
   npx playwright test --reporter=junit
   ```

### Анализ упавших тестов

**Шаги для диагностики:**

1. **Проверьте скриншоты:** автоматически сохраняются в `test-results/`
2. **Изучите трассировку:** используйте команду `npx playwright show-trace trace.zip`
3. **Проанализируйте логи:** полные логи доступны в HTML отчете
4. **Воспроизведите локально:** запустите тест в режиме отладки

**Распространенные статусы тестов:**

| Статус | Значение | Действия |
|--------|----------|----------|
| ✅ PASSED | Тест успешно выполнен | - |
| ❌ FAILED | Тест упал | Проверить скриншоты, логи, трассировку |
| ⏸️ SKIPPED | Тест пропущен | Проверить условия пропуска |
| ⚠️ FLAKY | Нестабильный тест | Улучшить стабильность, добавить retry |

### Метрики качества

**Отслеживайте следующие метрики:**
- **Успешность тестов:** процент успешных тестов от общего количества
- **Время выполнения:** общее время прогона тестов
- **Стабильность:** количество нестабильных (flaky) тестов
- **Покрытие:** процент функциональности, покрытой тестами

---

## Добавление новых тестов

### Структура тестового файла

```javascript
import { test, expect } from '@playwright/test';

test.describe('Название функциональности', () => {
  test.beforeEach(async ({ page }) => {
    // Настройка перед каждым тестом
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
  });

  test('Конкретный тестовый сценарий', async ({ page }) => {
    // Шаги теста
    await page.locator('селектор').click();
    
    // Проверки (assertions)
    await expect(page.locator('элемент')).toBeVisible();
    await expect(page).toHaveTitle(/ожидаемый заголовок/);
  });

  test.afterEach(async ({ page }) => {
    // Очистка после каждого теста
  });
});
```

### Рекомендуемые селекторы

**Приоритет использования селекторов (от наилучшего к худшему):**

1. **data-testid:** `data-testid="submit-button"`
   ```javascript
   await page.locator('[data-testid="submit-button"]').click();
   ```

2. **Ролевые селекторы:** `getByRole()`
   ```javascript
   await page.getByRole('button', { name: 'Отправить' }).click();
   await page.getByLabel('Имя').fill('Тест');
   ```

3. **Текстовые селекторы:** `getByText()`
   ```javascript
   await page.getByText('Подтвердить').click();
   ```

4. **CSS селекторы:**
   ```javascript
   await page.locator('.form-submit').click();
   ```

5. **XPath (использовать только при необходимости):**
   ```javascript
   await page.locator('xpath=//button[contains(text(), "Отправить")]').click();
   ```

### Шаблон для тестирования форм

```javascript
test.describe('Новая форма', () => {
  test('Заполнение и отправка формы', async ({ page }) => {
    // 1. Переход к форме
    await page.goto('/form-page');
    
    // 2. Заполнение полей
    await page.getByLabel('Имя').fill('Иван Иванов');
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Телефон').fill('+7 (999) 123-45-67');
    
    // 3. Взаимодействие с элементами
    await page.getByRole('checkbox').check();
    await page.getByRole('combobox').selectOption('option-value');
    
    // 4. Отправка формы
    await page.getByRole('button', { name: 'Отправить' }).click();
    
    // 5. Проверки результата
    await expect(page.getByText('Спасибо за заявку!')).toBeVisible();
    await expect(page).toHaveURL(/success/);
  });
  
  test('Валидация обязательных полей', async ({ page }) => {
    await page.goto('/form-page');
    await page.getByRole('button', { name: 'Отправить' }).click();
    
    // Проверка сообщений об ошибках
    await expect(page.getByText('Поле обязательно для заполнения')).toBeVisible();
    await expect(page.getByLabel('Имя')).toHaveClass(/error/);
  });
});
```

### Тестирование мобильной версии

```javascript
test.describe('Мобильная версия', () => {
  test.use({ viewport: { width: 375, height: 667 } });
  
  test('Бургер-меню открывается на мобильных', async ({ page }) => {
    await page.goto('/');
    
    // Проверка, что меню скрыто на мобильных
    await expect(page.locator('.desktop-nav')).toBeHidden();
    await expect(page.locator('.mobile-menu-button')).toBeVisible();
    
    // Открытие меню
    await page.locator('.mobile-menu-button').click();
    await expect(page.locator('.mobile-nav')).toBeVisible();
  });
});
```

---

## Best Practices

### 1. Стабильность тестов

**Избегайте жестких таймаутов:**
```javascript
// ПЛОХО:
await page.waitForTimeout(5000);

// ХОРОШО:
await page.waitForSelector('.element', { state: 'visible', timeout: 10000 });
await expect(page.locator('.element')).toBeVisible({ timeout: 10000 });
```

**Используйте retry-логику для неустойчивых операций:**
```javascript
const retryOperation = async (operation, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await page.waitForTimeout(1000 * (i + 1)); // Экспоненциальная задержка
    }
  }
};

// Использование:
await retryOperation(async () => {
  await page.locator('.unstable-element').click();
});
```

### 2. Поддерживаемость

**Используйте Page Object Model (POM):**
```javascript
// pages/HomePage.js
class HomePage {
  constructor(page) {
    this.page = page;
    this.navLinks = page.locator('nav a');
    this.submitButton = page.locator('[data-testid="submit-button"]');
  }
  
  async navigate() {
    await this.page.goto('/');
  }
  
  async clickSubmit() {
    await this.submitButton.click();
  }
}

// В тестах:
const homePage = new HomePage(page);
await homePage.navigate();
await homePage.clickSubmit();
```

**Создайте shared utilities:**
```javascript
// utils/test-helpers.js
export async function fillForm(page, data) {
  for (const [field, value] of Object.entries(data)) {
    await page.getByLabel(field).fill(value);
  }
}

export async function takeScreenshotOnFailure(testInfo, page, name) {
  if (testInfo.status !== testInfo.expectedStatus) {
    await page.screenshot({ path: `test-results/${name}-${testInfo.title}.png` });
  }
}
```

### 3. Производительность

**Оптимизируйте время выполнения:**
- Запускайте тесты параллельно
- Используйте `test.beforeAll()` для дорогостоящих setup-операций
- Избегайте ненужных переходов между страницами
- Используйте моки для внешних API

**Пример оптимизации:**
```javascript
test.describe('Быстрые тесты', () => {
  let page;
  
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('/');
  });
  
  test.afterAll(async () => {
    await page.close();
  });
  
  test('Быстрый тест 1', async () => {
    // Используем уже открытую страницу
    await page.locator('.element').click();
  });
});
```

### 4. Кросс-браузерное тестирование

**Учитывайте различия браузеров:**
```javascript
test('Работает во всех браузерах', async ({ page, browserName }) => {
  await page.goto('/');
  
  // Браузер-специфичные ожидания
  if (browserName === 'firefox') {
    // Firefox может требовать дополнительного времени
    await page.waitForTimeout(500);
  }
  
  // Общие проверки
  await expect(page.locator('.content')).toBeVisible();
});
```

### 5. Тестирование доступности (a11y)

**Добавьте проверки доступности:**
```javascript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('Страница соответствует стандартам доступности', async ({ page }) => {
  await page.goto('/');
  
  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  
  expect(accessibilityScanResults.violations).toEqual([]);
});
```

---

## Отладка и устранение проблем

### Инструменты отладки

1. **Playwright Inspector:**
   ```bash
   npx playwright test --debug
   ```
   Открывает интерактивный отладчик с возможностью:
   - Пошагового выполнения
   - Просмотра DOM
   - Выполнения команд в консоли

2. **Трассировка (Trace Viewer):**
   ```bash
   # Запуск тестов с записью трассировки
   npx playwright test --trace=on
   
   # Просмотр трассировки
   npx playwright show-trace trace.zip
   ```

3. **Скриншоты и видео:**
   - Автоматически сохраняются при падении теста
   - Доступны в `test-results/` и HTML отчете

### Распространенные проблемы и решения

**Проблема 1: Таймауты при загрузке страницы**
```
Error: page.waitForLoadState: Test timeout of 30000ms exceeded.
```
**Решение:**
```javascript
// Заменить:
await page.waitForLoadState('networkidle');

// На:
await page.waitForLoadState('domcontentloaded');
await page.waitForSelector('body', { state: 'visible' });
```

**Проблема 2: Элемент не найден**
```
Error: page.locator: Target closed
Error: locator.click: Target detached
```
**Решение:**
```javascript
// Добавить ожидание перед взаимодействием
await page.locator('.element').waitFor({ state: 'attached' });
await page.locator('.element').click();

// Или использовать более стабильный селектор
await page.getByRole('button', { name: 'Отправить' }).click();
```

**Проблема 3: Нестабильные тесты (flaky tests)**
**Решение:**
- Добавить retry-логику
- Увеличить таймауты ожидания
- Использовать более специфичные селекторы
- Изолировать тесты друг от друга

### Диагностический чеклист

При возникновении проблемы:

1. [ ] Проверить, запущен ли локальный сервер (`npx serve -p 8080`)
2. [ ] Убедиться, что установлены все браузеры (`npx playwright install`)
3. [ ] Проверить скриншоты в `test-results/`
4. [ ] Просмотреть трассировку выполнения
5. [ ] Запустить тест в режиме отладки (`--debug`)
6. [ ] Проверить консольные логи на наличие ошибок
7. [ ] Убедиться, что тест работает изолированно

---

## Интеграция с CI/CD

### Настройка GitHub Actions

**`.github/workflows/playwright.yml`:**
```yaml
name: Playwright Tests
on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - uses: actions/setup-node@v4
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Install Playwright browsers
      run: npx playwright install --with-deps
      
    - name: Run Playwright tests
      run: npx playwright test
      
    - name: Upload test results
      if: always()
      uses: actions/upload-artifact@v4
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 30
```

### Настройка GitLab CI

**`.gitlab-ci.yml`:**
```yaml
stages:
  - test

playwright:
  stage: test
  image: mcr.microsoft.com/playwright:v1.40.0-focal
  script:
    - npm ci
    - npx playwright install --with-deps
    - npx playwright test
  artifacts:
    when: always
    paths:
      - playwright-report/
    expire_in: 1 week
```

### Настройка Jenkins

**Jenkinsfile:**
```groovy
pipeline {
  agent {
    docker {
      image 'mcr.microsoft.com/playwright:v1.40.0-focal'
    }
  }
  
  stages {
    stage('Test') {
      steps {
        sh 'npm ci'
        sh 'npx playwright install --with-deps'
        sh 'npx playwright test'
      }
      
      post {
        always {
          archiveArtifacts artifacts: 'playwright-report/**/*', fingerprint: true
          junit 'test-results/**/*.xml'
        }
      }
    }
  }
}
```

### Мониторинг результатов

**Рекомендуемые метрики для CI/CD:**
- **Успешность тестов:** должна быть > 85%
- **Время выполнения:** не более 10 минут
- **Количество нестабильных тестов:** должно стремиться к 0
- **Покрытие новых функций:** все новые функции должны иметь тесты

**Уведомления:**
- Настройте уведомления в Slack/Teams при падении тестов
- Интегрируйте с Jira для автоматического создания задач
- Используйте дашборды для визуализации трендов

---

## Часто задаваемые вопросы

### Q1: Тесты работают локально, но падают в CI. Что делать?
**A:** Проверьте различия в окружении:
- Версии браузеров
- Разрешение экрана
- Доступность ресурсов
- Таймауты (увеличьте в CI)

### Q2: Как тестировать элементы, которые появляются после AJAX-запросов?
**A:** Используйте ожидания:
```javascript
await page.waitForResponse(response => 
  response.url().includes('/api/data') && response.status() === 200
);
await expect(page.locator('.dynamic-element')).toBeVisible();
```

### Q3: Можно ли запускать тесты на продакшн-окружении?
**A:** Да, но с осторожностью:
- Используйте тестовые данные
- Избегайте модификации продакшн-данных
- Настройте отдельную конфигурацию
- Рассмотрите использование staging-окружения

### Q4: Как организовать тестовые данные?
**A:** Создайте фикстуры:
```javascript
// fixtures/test-data.js
export const testUsers = {
  admin: { email: 'admin@test.com', password: 'admin123' },
  user: { email: 'user@test.com', password: 'user123' }
};

// В тестах:
import { testUsers } from '../fixtures/test-data';
await page.getByLabel('Email').fill(testUsers.user.email);
```

### Q5: Как ускорить выполнение тестов?
**A:** 
- Запускайте тесты параллельно (`--workers=auto`)
- Используйте `test.beforeAll()` вместо `test.beforeEach()` где возможно
- Мокируйте медленные внешние зависимости
- Оптимизируйте селекторы

### Q6: Как тестировать файловые загрузки?
**A:** 
```javascript
const fileChooserPromise = page.waitForEvent('filechooser');
await page.locator('input[type="file"]').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles('path/to/file.pdf');
```

---

## Полезные ресурсы

### Документация
- [Официальная документация Playwright](https://playwright.dev/docs/intro)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)

### Инструменты
- [Playwright Test Generator](https://playwright.dev/docs/codegen)
- [Playwright Inspector](https://playwright.dev/docs/debug)
- [Playwright Trace Viewer](https://playwright.dev/docs/trace-viewer)

### Сообщество
- [Playwright GitHub Discussions](https://github.com/microsoft/playwright/discussions)
- [Stack Overflow - Playwright tag](https://stackoverflow.com/questions/tagged/playwright)
- [Discord Playwright Community](https://aka.ms/playwright/discord)

---

## Заключение

Данное руководство должно служить основной точкой отсчета для всех вопросов, связанных с тестированием в проекте. Регулярно обновляйте его по мере появления новых практик и инструментов.

**Ключевые принципы:**
1. **Стабильность важнее скорости:** лучше стабильные медленные тесты, чем быстрые нестабильные
2. **Поддерживаемость:** пишите тесты, которые легко читать и изменять
3. **Автоматизация:** все, что можно автоматизировать, должно быть автоматизировано
4. **Непрерывное улучшение:** регулярно рефакторите и оптимизируйте тесты

**Контакты для вопросов:**
- Команда разработки: dev-team@example.com
- Ответственный за тестирование: qa-lead@example.com

*Последнее обновление: 21 апреля 2026 г.*