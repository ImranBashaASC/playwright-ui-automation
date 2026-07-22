import { test, expect } from '@playwright/test';
import { LoginPage } from '@/pages/LoginPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { Env } from '@/utils/env.config';

test.describe('Login Functionality', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await loginPage.navigate();
  });

  test('@Smoke @Regression: Successful login with valid credentials', async () => {
    await loginPage.login(Env.getAdminUser(), Env.getAdminPassword());
    await dashboardPage.verifyOnDashboardPage();
  });

  test('@Regression: Failed login with invalid credentials', async ({ page }) => {
    await loginPage.login('invalid_user', 'invalid_password');
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Epic sadface: Username and password do not match any user in this service');
  });

  test('@Regression: Failed login with locked out user', async ({ page }) => {
    await loginPage.login('locked_out_user', Env.getAdminPassword());
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Epic sadface: Sorry, this user has been locked out.');
  });
});
