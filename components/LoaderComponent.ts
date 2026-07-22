
import { Page } from '@playwright/test';
import { BaseComponent } from './BaseComponent';

export class LoaderComponent extends BaseComponent {
  constructor(page: Page) {
    super(page, 'div[data-testid="loader"]');
  }
  // Add loader specific methods
}
