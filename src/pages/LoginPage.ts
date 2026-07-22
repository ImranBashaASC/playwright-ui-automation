import { Page, Locator } from '@playwright/test';
import { BasePage } from '@/base/BasePage';
import { Env } from '@/utils/env.config';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async navigate(): Promise<void> {
    await this.navigateTo(Env.getBaseUrl());
  }

  async login(username: string, password?: string): Promise<void> {
    await this.fill(this.usernameInput, username);
    if (password) {
      await this.fill(this.passwordInput, password);
    }
    await this.click(this.loginButton);
  }

  async getErrorMessage(): Promise<string> {
    return this.getText(this.errorMessage);
  }
}
