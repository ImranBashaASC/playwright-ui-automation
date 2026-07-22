import { test, expect } from '../src/fixtures/custom-fixtures';

test.describe('Example Test Suite', () => {
  
  test('@Smoke has title', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('@Regression get started link', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    const getStartedLink = page.getByRole('link', { name: 'Get started' });
    await expect(getStartedLink).toBeVisible();
    await getStartedLink.click();
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  });

});
