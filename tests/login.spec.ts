
import { test, expect } from './BaseTest';
import logger from '../utils/Logger';

test.describe('Login Functionality @Smoke @Critical', () => {
  test.beforeEach(async ({ loginPage }) => {
    logger.info('Navigating to login page');
    await loginPage.navigate();
  });

  test('should allow a user to log in with valid credentials', async ({
    loginPage,
    dashboardPage,
  }) => {
    test.info().annotations.push({ type: 'story', description: 'User-Login-Success' });
    logger.info('Test Step: Starting login process');
    await loginPage.login(process.env.ADMIN_USERNAME!, process.env.ADMIN_PASSWORD!);
    logger.info('Test Step: Verifying successful login');
    await expect(dashboardPage.getHeaderTitle()).toHaveText('Dashboard');
  });

  test('should show an error message with invalid credentials', async ({
    loginPage,
  }) => {
    test.info().annotations.push({ type: 'story', description: 'User-Login-Failure' });
    logger.info('Test Step: Attempting login with invalid credentials');
    await loginPage.login('invalid-user', 'invalid-password');
    logger.info('Test Step: Verifying error message');
    await expect(loginPage.getErrorMessage()).toBeVisible();
    await expect(loginPage.getErrorMessage()).toContainText(
      'Invalid credentials'
    );
  });
});
