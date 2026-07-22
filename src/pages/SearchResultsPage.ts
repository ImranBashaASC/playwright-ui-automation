
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class SearchResultsPage extends BasePage {
  readonly searchResultsContainer: Locator;
  readonly firstLogitechResult: Locator;

  constructor(page: Page) {
    super(page);
    this.searchResultsContainer = this.page.locator('[data-component-type="s-search-results"]');
    this.firstLogitechResult = this.page.locator('//div[contains(@class, "s-result-item")]//span[contains(text(), "Logitech")]').first();
  }

  async assertSearchResultsDisplayed(): Promise<void> {
    await expect(this.searchResultsContainer).toBeVisible();
    await expect(this.page.locator('.s-result-item')).toHaveCountGreaterThan(0);
  }

  async assertBrandResultIsVisible(brand: string): Promise<void> {
    const brandResult = this.page.locator(`//div[contains(@class, "s-result-item")]//span[contains(text(), "${brand}")]`);
    await expect(brandResult.first()).toBeVisible();
  }

  async selectFirstLogitechProduct(): Promise<Page> {
    const pagePromise = this.page.context().waitForEvent('page');
    await this.firstLogitechResult.locator('xpath=ancestor::a[1]').click();
    const newPage = await pagePromise;
    await newPage.waitForLoadState();
    return newPage;
  }
}
