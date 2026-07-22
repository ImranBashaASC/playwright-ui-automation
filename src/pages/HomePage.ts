
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { HeaderComponent } from '../components/HeaderComponent';

export class HomePage extends BasePage {
  readonly header: HeaderComponent;
  readonly amazonLogo: Locator;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
    this.amazonLogo = page.locator('#nav-logo-sprites');
  }

  async goto(): Promise<void> {
    await this.navigate('https://www.amazon.in');
  }

  async assertOnHomePage(): Promise<void> {
    await expect(this.page).toHaveTitle(/Online Shopping site in India/);
    await this.assertElementIsVisible(this.amazonLogo, 'Amazon Logo');
  }
}
