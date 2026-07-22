
import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CustomerPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }
  // Add customer page specific methods and locators
}
