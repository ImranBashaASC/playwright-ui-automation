import { type Locator, type Page } from '@playwright/test';

/**
 * Represents the Login page of the application.
 * Encapsulates all locators and actions related to logging in.
 */
export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByTestId('username');
    this.passwordInput = page.getByTestId('password');
    this.loginButton = page.getByTestId('login-button');
    this.errorMessage = page.getByTestId('error');
  }

  /**
   * Navigates to the login page using the baseURL from the config.
   */
  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  /**
   * Fills the login form and submits it.
   * @param {string} username - The username to enter.
   * @param {string} password - The password to enter.
   */
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
