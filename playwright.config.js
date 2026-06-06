import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  timeout: 30000,

  reporter: [
    ['html'],
    ['line'],
    ['allure-playwright'],
    ['json', { outputFile: 'test-results/results.json' }]
  ],

  use: {
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure'
  }
});