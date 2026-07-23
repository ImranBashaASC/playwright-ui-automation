import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { HomePage } from '../pages/home.page';

// Define the types for our custom fixtures
type MyFixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
};

/**
 * Extends the base Playwright `test` object with custom fixtures.
 * This fixture will automatically initialize all Page Objects and provide them to the tests,
 * removing the need for manual instantiation in every test file.
 */
export const test = base.extend<MyFixtures>({
  // Fixture for LoginPage
  loginPage: async ({ page }, use) => {
    // Initialize LoginPage with the current page context
    const loginPage = new LoginPage(page);
    // Provide the initialized page object to the test
    await use(loginPage);
  },

  // Fixture for HomePage
  homePage: async ({ page }, use) => {
    // Initialize HomePage with the current page context
    const homePage = new HomePage(page);
    // Provide the initialized page object to the test
    await use(homePage);
  },
});

// Re-export `expect` from Playwright so we can use it from our fixture file
export { expect } from '@playwright/test';
