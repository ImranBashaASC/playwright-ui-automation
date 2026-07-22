
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class SearchResultsPage extends BasePage {
  readonly searchResultItems: Locator;

  constructor(page: Page) {
    super(page);
    this.searchResultItems = page.locator('[data-component-type="s-search-result"]');
  }

  async assertSearchResultsPageIsDisplayed(): Promise<void> {
    await this.waitForElementVisible(this.searchResultItems.first(), 'First Search Result');
    const count = await this.searchResultItems.count();
    expect(count).toBeGreaterThan(0);
  }

  async assertResultContainsBrand(brand: string): Promise<void> {
    await expect(this.searchResultItems.filter({ hasText: brand }).first()).toBeVisible();
  }

  async selectFirstProductByBrand(brand: string): Promise<void> {
    const firstMatchingProduct = this.searchResultItems.filter({ hasText: brand }).first();
    await firstMatchingProduct.locator('h2 a').click();
  }
}
