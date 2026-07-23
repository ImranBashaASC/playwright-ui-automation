import { type Locator, type Page } from '@playwright/test';

/**
 * Represents the Home/Inventory page of the application.
 * Encapsulates all locators and actions related to this page.
 */
export class HomePage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly shoppingCartLink: Locator;
  readonly inventoryList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('.title');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
    this.inventoryList = page.locator('.inventory_list');
  }

  /**
   * Verifies that the user is on the inventory page by checking the title.
   */
  async verifyOnInventoryPage(): Promise<void> {
    await this.pageTitle.waitFor({ state: 'visible' });
  }
}
