
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  private readonly headerTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.headerTitle = this.page.locator('h1[data-testid="dashboard-header"]');
  }

  async getHeaderTitle(): Promise<Locator> {
    return this.headerTitle;
  }

  async navigateToCustomers(): Promise<void> {
    await this.click('[data-testid="nav-customers"]');
  }
}
