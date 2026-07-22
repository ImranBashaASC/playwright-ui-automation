
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  // Locators
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    // Initialize locators using data-testid for robustness
    this.usernameInput = this.page.locator('[data-testid="username-input"]');
    this.passwordInput = this.page.locator('[data-testid="password-input"]');
    this.loginButton = this.page.locator('[data-testid="login-button"]');
    this.errorMessage = this.page.locator('[data-testid="error-message"]');
  }

  // Business Methods
  async login(username: string, password: string): Promise<void> {
    await this.fill(
      '[data-testid="username-input"]',
      username,
      ['#username', 'input[name="username"]']
    );
    await this.fill(
      '[data-testid="password-input"]',
      password,
      ['#password', 'input[name="password"]']
    );
    await this.click(
      '[data-testid="login-button"]',
      ['button[type="submit"]']
    );
  }

  // Navigation Methods
  async navigate(): Promise<void> {
    await super.navigate('/login');
  }

  // Assertion / Getter Methods
  getErrorMessage(): Locator {
    return this.errorMessage;
  }
}
