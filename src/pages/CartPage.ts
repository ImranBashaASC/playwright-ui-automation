
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class CartPage extends BasePage {
  readonly cartItemName: Locator;
  readonly cartItemQuantity: Locator;
  readonly cartItemPrice: Locator;
  readonly cartSubtotal: Locator;

  constructor(page: Page) {
    super(page);
    // Locators for the first item in the cart
    this.cartItemName = this.page.locator('.sc-product-title').first();
    this.cartItemQuantity = this.page.locator('.a-dropdown-prompt').first();
    this.cartItemPrice = this.page.locator('.sc-price').first();
    this.cartSubtotal = this.page.locator('#sc-subtotal-amount-activecart span');
  }

  async assertProductInCart(productName: string): Promise<void> {
    await expect(this.cartItemName).toContainText(productName.substring(0, 30));
  }

  async assertProductQuantity(expectedQuantity: number): Promise<void> {
    await expect(this.cartItemQuantity).toHaveText(expectedQuantity.toString());
  }

  async assertProductPrice(expectedPrice: string): Promise<void> {
    const cartPriceText = await this.cartItemPrice.innerText();
    // Amazon price in cart can have currency symbols and commas.
    // We'll check if the captured price (e.g., "1,499") is contained in the cart price (e.g., "₹1,499.00")
    expect(cartPriceText.replace(/[^0-9]/g, '')).toContain(expectedPrice.replace(/[^0-9]/g, ''));
  }

  async assertCartSubtotalIsGreaterThanZero(): Promise<void> {
    const subtotalText = await this.cartSubtotal.innerText();
    const subtotalValue = parseFloat(subtotalText.replace(/[^0-9.]/g, ''));
    expect(subtotalValue).toBeGreaterThan(0);
  }

  async takeCartScreenshot(): Promise<void> {
      await this.page.screenshot({ path: 'playwright-report/cart-page-screenshot.png', fullPage: true });
  }
}
