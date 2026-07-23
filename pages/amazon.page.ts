
import { Page, Locator } from '@playwright/test';

export class AmazonPage {
  readonly page: Page;
  readonly amazonLogo: Locator;
  readonly searchTextBox: Locator;
  readonly searchButton: Locator;
  readonly searchResults: Locator;
  readonly productTitle: Locator;
  readonly productPrice: Locator;
  readonly addToCartButton: Locator;
  readonly addedToCartMessage: Locator;
  readonly goToCartButton: Locator;
  readonly cartItems: Locator;
  readonly cartQuantity: Locator;
  readonly cartSubtotal: Locator;

  constructor(page: Page) {
    this.page = page;
    this.amazonLogo = page.getByRole('link', { name: 'Amazon.in' });
    this.searchTextBox = page.getByLabel('Search Amazon.in');
    this.searchButton = page.getByRole('button', { name: 'Go' });
    this.searchResults = page.locator('[data-component-type="s-search-result"]');
    this.productTitle = page.locator('#productTitle');
    this.productPrice = page.locator('span.a-price-whole');
    this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' });
    this.addedToCartMessage = page.getByText('Added to Cart');
    this.goToCartButton = page.getByRole('link', { name: 'Go to Cart' });
    this.cartItems = page.locator('[data-name="Active Items"] .sc-list-item');
    this.cartQuantity = page.locator('.a-dropdown-prompt');
    this.cartSubtotal = page.locator('#sc-subtotal-amount-activecart');
  }

  async goto() {
    await this.page.goto('https://www.amazon.in');
  }

  async searchProduct(keyword: string) {
    await this.searchTextBox.fill(keyword);
    await this.searchButton.click();
  }
}
