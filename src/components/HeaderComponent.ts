import { Locator, Page } from '@playwright/test';
import { BaseComponent } from '../base/BaseComponent';

export class HeaderComponent extends BaseComponent {
  readonly logo: Locator;
  readonly searchInput: Locator;
  readonly userProfileMenu: Locator;

  constructor(page: Page) {
    super(page, 'header'); // Assuming the header has a <header> tag
    this.logo = this.container.locator('.logo');
    this.searchInput = this.container.locator('input[name="search"]');
    this.userProfileMenu = this.container.locator('.user-profile');
  }

  async searchFor(text: string): Promise<void> {
    await this.fill(this.searchInput, text);
    await this.page.press('input[name="search"]', 'Enter');
    this.logger.info(`Searched for: ${text}`);
  }

  async clickUserProfile(): Promise<void> {
    await this.click(this.userProfileMenu);
    this.logger.info('Clicked on user profile menu');
  }
}
