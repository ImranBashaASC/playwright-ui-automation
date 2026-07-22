import { Page, Locator } from '@playwright/test';
import { BasePage } from '@/base/BasePage';

export class DashboardPage extends BasePage {
  readonly pageTitle: Locator;
  readonly inventoryList: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('.title');
    this.inventoryList = page.locator('.inventory_list');
  }

  async verifyOnDashboardPage(): Promise<void> {
    await this.expectToBeVisible(this.pageTitle);
    await this.expectToHaveText(this.pageTitle, 'Products');
    await this.expectToBeVisible(this.inventoryList);
  }
}
