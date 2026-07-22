
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class CartPage extends BasePage {
  readonly cartItems: Locator;
  readonly cartItemName: Locator;
  readonly cartItemPrice: Locator;
  readonly cartItemQuantity: Locator;
  readonly cartSubtotal: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItems = page.locator('div[data-name="Active Items"] div.sc-list-item-content');
    this.cartItemName = this.cartItems.first().locator('.sc-product-title');
    this.cartItemPrice = this.cartItems.first().locator('.sc-product-price');
    this.cartItemQuantity = this.cartItems.first().locator('span.a-dropdown-prompt');
    this.cartSubtotal = page.locator('#sc-subtotal-amount-activecart span.a-size-medium');
  }

  async assertProductInCart(expectedName: string): Promise<void> {
    // Use a substring to avoid failures from minor text differences or truncation
    await expect(this.cartItemName).toContainText(expectedName.substring(0, 30));
  }

  async assertProductQuantity(expectedQuantity: number): Promise<void> {
    await this.assertTextEquals(this.cartItemQuantity, String(expectedQuantity), 'Cart Item Quantity');
  }

  async assertProductPrice(expectedPrice: string): Promise<void> {
    await expect(this.cartItemPrice).toHaveText(expectedPrice);
  }

  async assertCartSubtotalIsGreaterThanZero(): Promise<void> {
    const subtotalText = await this.cartSubtotal.innerText();
    const subtotal = parseFloat(subtotalText.replace(/[^0-9.]/g, ''));
    expect(subtotal).toBeGreaterThan(0);
  }
}
