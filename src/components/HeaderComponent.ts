
import { Page, Locator } from '@playwright/test';
import { BaseComponent } from '../base/BaseComponent';

export class HeaderComponent extends BaseComponent {
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly cartButton: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.locator('#twotabsearchtextbox');
    this.searchButton = page.locator('#nav-search-submit-button');
    this.cartButton = page.locator('#nav-cart');
  }

  async searchFor(text: string): Promise<void> {
    await this.searchInput.fill(text);
    await this.searchButton.click();
  }

  async navigateToCart(): Promise<void> {
    await this.cartButton.click();
  }
}
