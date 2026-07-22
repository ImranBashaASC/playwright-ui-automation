
import { Page, Locator } from '@playwright/test';
import { BaseComponent } from './BaseComponent';

export class HeaderComponent extends BaseComponent {
  private readonly logo: Locator;
  private readonly userProfileMenu: Locator;
  private readonly logoutButton: Locator;

  constructor(page: Page) {
    super(page, 'header[data-testid="app-header"]');
    this.logo = this.container.locator('[data-testid="header-logo"]');
    this.userProfileMenu = this.container.locator('[data-testid="user-profile-menu"]');
    this.logoutButton = this.container.locator('[data-testid="logout-button"]');
  }

  async clickLogo(): Promise<void> {
    await this.logo.click();
  }

  async logout(): Promise<void> {
    await this.userProfileMenu.click();
    await this.logoutButton.click();
  }
}
