import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Максимальное время выполнения одного теста */
  timeout: 30 * 1000,
  expect: {
    /**
     * Максимальное время ожидания для expect assertions
     */
    timeout: 5000
  },
  /* Запускать тесты в файлах параллельно */
  fullyParallel: true,
  /* Запретить fail тестов из-за параллелизма */
  forbidOnly: !!process.env.CI,
  /* Повторно запускать упавшие тесты только в CI */
  retries: process.env.CI ? 2 : 0,
  /* Оптимальное количество воркеров для CI, можно настроить под локальную машину */
  workers: process.env.CI ? 1 : undefined,
  /* Отчетность: использовать HTML отчет по умолчанию */
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['list']
  ],
  /* Общие настройки для всех проектов */
  use: {
    /* Базовый URL для всех тестов */
    baseURL: 'http://localhost:8080',
    /* Собирать трассировку при падении теста */
    trace: 'on-first-retry',
    /* Скриншоты только при падении */
    screenshot: 'only-on-failure',
    /* Видео не записываем для экономии ресурсов */
    video: 'off',
  },

  /* Настройки проектов для разных браузеров и viewport */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    /* Мобильный Chrome (эмуляция) */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    /* Мобильный Safari (эмуляция) */
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  /* Веб-сервер для запуска статического сайта перед тестами */
  webServer: {
    command: 'npx serve -p 8080',
    url: 'http://localhost:8080',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});