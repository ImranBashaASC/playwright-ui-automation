
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class ProductDetailPage extends BasePage {
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly addToCartButton: Locator;
  readonly addedToCartSuccessMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.productName = page.locator('#productTitle');
    this.productPrice = page.locator('div[id=corePrice_feature_div] span.a-price-offscreen').first();
    this.addToCartButton = page.locator('#add-to-cart-button');
    this.addedToCartSuccessMessage = page.locator('div#nav-flyout-attach h4.a-alert-heading:has-text("Added to Cart")');
  }

  async getProductDetails(): Promise<{ name: string; price: string }> {
    const name = await this.productName.innerText();
    const price = await this.productPrice.innerText();
    return { name: name.trim(), price: price.trim() };
  }

  async assertAddToCartButtonIsVisible(): Promise<void> {
    await this.assertElementIsVisible(this.addToCartButton, 'Add to Cart Button');
    await expect(this.addToCartButton).toBeEnabled();
  }

  async clickAddToCart(): Promise<void> {
    await this.click(this.addToCartButton, 'Add to Cart Button');
  }

  async assertProductAddedToCart(): Promise<void> {
    await this.assertElementIsVisible(this.addedToCartSuccessMessage, 'Added to Cart Success Message');
  }
}
