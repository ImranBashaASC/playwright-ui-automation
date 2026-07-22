import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { HeaderComponent } from '../components/HeaderComponent';
import { LeftNavComponent } from '../components/LeftNavComponent';

export class DashboardPage extends BasePage {
  readonly welcomeHeader: Locator;
  readonly header: HeaderComponent;
  readonly leftNav: LeftNavComponent;

  constructor(page: Page) {
    super(page);
    this.welcomeHeader = page.locator('h1', { hasText: 'Welcome' });
    this.header = new HeaderComponent(page);
    this.leftNav = new LeftNavComponent(page);
  }

  async assertWelcomeMessage(username: string): Promise<void> {
    const welcomeMessage = this.page.locator(`h1:has-text("Welcome, ${username}")`);
    await this.assertElementIsVisible(welcomeMessage);
    this.logger.info(`Verified welcome message for user ${username}`);
  }

  async navigateToCustomers(): Promise<void> {
    await this.leftNav.goToCustomers();
  }
}
