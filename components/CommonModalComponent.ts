
import { Page, Locator } from '@playwright/test';
import { BaseComponent } from './BaseComponent';

export class CommonModalComponent extends BaseComponent {
  private readonly title: Locator;
  private readonly closeButton: Locator;
  private readonly confirmButton: Locator;

  constructor(page: Page) {
    super(page, 'div[role="dialog"]');
    this.title = this.container.locator('.modal-title');
    this.closeButton = this.container.locator('button.close');
    this.confirmButton = this.container.locator('button.confirm');
  }

  async getTitle(): Promise<string> {
    return this.title.innerText();
  }

  async close(): Promise<void> {
    await this.closeButton.click();
  }

  async confirm(): Promise<void> {
    await this.confirmButton.click();
  }
}
