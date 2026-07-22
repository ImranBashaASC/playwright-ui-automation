
import { Locator, Page } from '@playwright/test';
import { BasePage } from '../pages/BasePage';

export class BaseComponent extends BasePage {
  protected readonly container: Locator;

  constructor(page: Page, containerSelector: string) {
    super(page);
    this.container = this.page.locator(containerSelector);
  }

  async isVisible(): Promise<boolean> {
    return this.container.isVisible();
  }
}
