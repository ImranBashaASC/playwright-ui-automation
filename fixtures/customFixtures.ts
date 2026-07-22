import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AuthHelper } from '../helpers/auth.helper';
import testData from '../data/testData.json';

type MyFixtures = {
    loginPage: LoginPage;
    authHelper: AuthHelper;
    authenticatedUser: void;
    adminUser: void;
    guestUser: void;
    testData: any;
};

export const test = base.extend<MyFixtures>({
    // Provides an instance of the LoginPage for each test
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    // Provides an instance of the AuthHelper
    authHelper: async ({ page }, use) => {
        await use(new AuthHelper(page));
    },

    // Fixture to log in as a standard authenticated user before the test
    authenticatedUser: async ({ page, loginPage }, use) => {
        // This assumes you have a valid user in your test data or environment variables
        const email = process.env.USER_EMAIL || testData.validUser.email;
        const password = process.env.USER_PASSWORD || testData.validUser.password;
        await loginPage.navigate();
        await loginPage.login(email, password);
        // You might want to add an assertion here to ensure login was successful
        await use();
        // Teardown (e.g., logout) can be added here if needed
    },

    // Fixture for an admin user (implementation would be similar to authenticatedUser)
    adminUser: async ({ page }, use) => {
        const adminEmail = process.env.ADMIN_EMAIL!;
        const adminPassword = process.env.ADMIN_PASSWORD!;
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login(adminEmail, adminPassword);
        await use();
    },

    // Fixture for a guest user (does nothing, just provides context)
    guestUser: async ({}, use) => {
        // This fixture doesn't need to perform any actions, just signifies a guest session
        await use();
    },

    // Fixture to provide test data from JSON file
    testData: async ({}, use) => {
        await use(testData);
    },
});

export { expect } from '@playwright/test';
