
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class ProductDetailsPage extends BasePage {
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly addToCartButton: Locator;
  readonly addedToCartConfirmation: Locator;
  readonly goToCartButton: Locator;

  private capturedProductName: string = '';
  private capturedProductPrice: string = '';

  constructor(page: Page) {
    super(page);
    this.productName = this.page.locator('#productTitle');
    this.productPrice = this.page.locator('#corePrice_feature_div .a-price-whole').first();
    this.addToCartButton = this.page.locator('#add-to-cart-button');
    this.addedToCartConfirmation = this.page.locator('//div[@id="attach-added-to-cart-alert-and-image-area"]//h4[normalize-space()="Added to Cart"]');
    this.goToCartButton = this.page.locator('#attach-sidesheet-view-cart-button');
  }

  async captureProductDetails(): Promise<{ name: string; price: string }> {
    this.capturedProductName = await this.productName.innerText();
    this.capturedProductPrice = await this.productPrice.innerText();
    return { name: this.capturedProductName, price: this.capturedProductPrice };
  }

  getCapturedDetails(): { name: string; price: string } {
      return { name: this.capturedProductName, price: this.capturedProductPrice };
  }

  async addProductToCart(): Promise<void> {
    await expect(this.addToCartButton).toBeVisible();
    await expect(this.addToCartButton).toBeEnabled();
    await this.addToCartButton.click();
  }

  async assertProductAddedToCart(): Promise<void> {
      await expect(this.addedToCartConfirmation).toBeVisible();
  }

  async navigateToCart(): Promise<void> {
      await this.goToCartButton.click();
  }
}
