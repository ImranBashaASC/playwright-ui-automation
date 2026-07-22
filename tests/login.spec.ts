import { test, expect } from '../src/fixtures/custom-fixtures';
import { DataUtils } from '../src/utils/DataUtils';

const invalidLogins = DataUtils.getJsonData('invalidLogins.json');

test.describe('Login Functionality', () => {

  test('@Smoke Successful Login', async ({ loginPage, page }) => {
    const username = process.env.ADMIN_USERNAME!;
    const password = process.env.ADMIN_PASSWORD!;

    await test.step('Navigate to login page', async () => {
      await loginPage.navigate();
    });

    await test.step('Perform login', async () => {
      await loginPage.login(username, password);
    });

    await test.step('Verify successful login', async () => {
      await loginPage.assertLoginSuccess();
      await expect(page.locator('h1', { hasText: 'Dashboard' })).toBeVisible();
    });
  });

  for (const invalidLogin of invalidLogins) {
    test(`@Regression Failed Login - ${invalidLogin.case}`, async ({ loginPage }) => {
      await test.step('Navigate to login page', async () => {
        await loginPage.navigate();
      });

      await test.step('Attempt to login with invalid credentials', async () => {
        await loginPage.login(invalidLogin.username, invalidLogin.password);
      });

      await test.step('Verify error message', async () => {
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain(invalidLogin.expectedError);
      });
    });
  }

  test('@Sanity Login with authenticated fixture', async ({ loggedInUserPage, dashboardPage }) => {
    // The login is handled by the fixture, the test starts on the dashboard
    await test.step('Verify user is on the dashboard', async () => {
      await dashboardPage.assertWelcomeMessage(process.env.STANDARD_USERNAME!);
    });

    await test.step('Navigate to another page', async () => {
      await dashboardPage.navigateToCustomers();
      await expect(loggedInUserPage).toHaveURL(/.*customers/);
    });
  });
});
