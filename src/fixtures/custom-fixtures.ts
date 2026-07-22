import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { MyLogger } from '../utils/logger';

type MyFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  // Fixture for a logged-in standard user
  loggedInUserPage: Page;
  // Fixture for a logged-in admin user
  adminUserPage: Page;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },

  loggedInUserPage: async ({ page }, use) => {
    const logger = MyLogger.getLogger('loggedInUserPageFixture');
    const loginPage = new LoginPage(page);
    const username = process.env.STANDARD_USERNAME!;
    const password = process.env.STANDARD_PASSWORD!;
    
    logger.info(`Logging in as standard user: ${username}`);
    await loginPage.navigate();
    await loginPage.login(username, password);
    await loginPage.assertUrl(/.*dashboard/);
    logger.info('Login successful, providing authenticated page');
    
    await use(page);
    
    // Teardown (e.g., logout) can be added here if needed
    logger.info('Test finished for loggedInUserPage');
  },

  adminUserPage: async ({ page }, use) => {
    const logger = MyLogger.getLogger('adminUserPageFixture');
    const loginPage = new LoginPage(page);
    const username = process.env.ADMIN_USERNAME!;
    const password = process.env.ADMIN_PASSWORD!;

    logger.info(`Logging in as admin user: ${username}`);
    await loginPage.navigate();
    await loginPage.login(username, password);
    await loginPage.assertUrl(/.*dashboard/);
    logger.info('Admin login successful, providing authenticated page');

    await use(page);
  },
});

export { expect } from '@playwright/test';
