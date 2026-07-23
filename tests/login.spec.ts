import { test, expect } from '../fixtures/page.fixture';
import * as users from '../test-data/users.json';

test.describe('SauceDemo Login Functionality', () => {

  // Hook to navigate to the login page before each test
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('should allow a standard user to log in successfully @smoke', async ({ loginPage, homePage }) => {
    // Perform login using the page object method
    await loginPage.login(users.standard.username, users.standard.password);

    // Assert that the user is redirected to the inventory page
    await expect(homePage.pageTitle).toHaveText('Products');
    await expect(homePage.inventoryList).toBeVisible();
  });

  test('should display an error message for a locked out user @regression', async ({ loginPage }) => {
    // Perform login with a locked out user's credentials
    await loginPage.login(users.locked_out.username, users.locked_out.password);

    // Assert that the correct error message is displayed
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Sorry, this user has been locked out.');
  });

  test('should display an error for invalid credentials @regression', async ({ loginPage }) => {
    // Perform login with invalid credentials
    await loginPage.login('invalid_user', 'invalid_password');

    // Assert that the correct error message is displayed
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Username and password do not match any user in this service');
  });
});
