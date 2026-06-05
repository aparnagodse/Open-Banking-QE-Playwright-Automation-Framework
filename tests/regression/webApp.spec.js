import { test, expect } from '@playwright/test';

test('Web app basic test', async ({ page }) => {
  console.log('🚀 Launching browser and navigating to site...');

  await page.goto('https://www.google.com');
  await page.waitForLoadState('domcontentloaded');

  // Title validation
  const title = await page.title();
  console.log('📄 Page Title:', title);
  await expect(page).toHaveTitle(/Google/);

  // Search box validation
  const searchBox = page.locator('textarea[name="q"]');
  await expect(searchBox).toBeVisible();

  console.log('✅ Web test passed');
});