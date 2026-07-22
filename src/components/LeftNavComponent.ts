import { Locator, Page } from '@playwright/test';
import { BaseComponent } from '../base/BaseComponent';

export class LeftNavComponent extends BaseComponent {
  readonly dashboardLink: Locator;
  readonly customersLink: Locator;
  readonly ordersLink: Locator;

  constructor(page: Page) {
    super(page, 'nav.left-navigation'); // Example locator for the left nav container
    this.dashboardLink = this.container.locator('a[href="/dashboard"]');
    this.customersLink = this.container.locator('a[href="/customers"]');
    this.ordersLink = this.container.locator('a[href="/orders"]');
  }

  async goToDashboard(): Promise<void> {
    await this.click(this.dashboardLink);
    this.logger.info('Navigated to Dashboard via left navigation');
  }

  async goToCustomers(): Promise<void> {
    await this.click(this.customersLink);
    this.logger.info('Navigated to Customers via left navigation');
  }

  async goToOrders(): Promise<void> {
    await this.click(this.ordersLink);
    this.logger.info('Navigated to Orders via left navigation');
  }
}
