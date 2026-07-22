
import { Page, Locator } from '@playwright/test';
import { BaseComponent } from '../base/BaseComponent';
import { expect } from '../fixtures/custom-fixtures';

export class HeaderComponent extends BaseComponent {
  readonly amazonLogo: Locator;
  readonly searchTextBox: Locator;
  readonly searchButton: Locator;
  readonly cartIcon: Locator;

  constructor(page: Page) {
    super(page);
    this.amazonLogo = this.page.locator('#nav-logo-sprites');
    this.searchTextBox = this.page.locator('#twotabsearchtextbox');
    this.searchButton = this.page.locator('#nav-search-submit-button');
    this.cartIcon = this.page.locator('#nav-cart');
  }

  async assertLogoIsVisible(): Promise<void> {
    await expect(this.amazonLogo).toBeVisible();
  }

  async searchForProduct(productName: string): Promise<void> {
    await expect(this.searchTextBox).toBeVisible();
    await expect(this.searchTextBox).toBeEnabled();
    await this.searchTextBox.fill(productName);
    await this.searchButton.click();
  }

  async navigateToCart(): Promise<void> {
    await this.cartIcon.click();
  }
}
