import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class BaseComponent extends BasePage {
  protected readonly container: Locator;

  constructor(page: Page, containerLocator: string) {
    super(page);
    this.container = page.locator(containerLocator);
  }

  /**
   * Checks if the component's container is visible.
   * @returns {Promise<boolean>}
   */
  async isVisible(): Promise<boolean> {
    return this.container.isVisible();
  }
}
