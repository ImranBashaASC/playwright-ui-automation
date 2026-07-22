
import { Page } from '@playwright/test';

export class WaitUtility {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForNetworkIdle(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  async waitForSelector(selector: string, state: 'attached' | 'detached' | 'visible' | 'hidden' = 'visible'): Promise<void> {
    await this.page.waitForSelector(selector, { state });
  }
}
