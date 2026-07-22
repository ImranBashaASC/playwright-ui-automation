import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');
    this.errorMessage = page.locator('.error-message');
  }

  async navigate(): Promise<void> {
    await super.navigate('/login');
  }

  async login(username: string, password: string):Promise<void> {
    this.logger.info(`Attempting to log in with username: ${username}`);
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
  }

  async getErrorMessage(): Promise<string> {
    await this.waitForElementVisible(this.errorMessage);
    const errorText = await this.errorMessage.textContent();
    this.logger.info(`Retrieved error message: ${errorText}`);
    return errorText || '';
  }

  async assertLoginSuccess(): Promise<void> {
    await this.assertUrl(/.*dashboard/);
    this.logger.info('Login successful, redirected to dashboard.');
  }
}
