
import { Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { HeaderComponent } from '../components/HeaderComponent';
import { expect } from '../fixtures/custom-fixtures';

export class HomePage extends BasePage {
  readonly header: HeaderComponent;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
  }

  async navigate(): Promise<void> {
    await super.navigate('https://www.amazon.in');
    await this.page.waitForURL('**/www.amazon.in/**');
  }

  async assertHomePageIsDisplayed(): Promise<void> {
    await expect(this.page).toHaveTitle(/Online Shopping site in India/);
    await this.header.assertLogoIsVisible();
  }
}
