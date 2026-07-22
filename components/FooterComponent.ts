
import { Page } from '@playwright/test';
import { BaseComponent } from './BaseComponent';

export class FooterComponent extends BaseComponent {
  constructor(page: Page) {
    super(page, 'footer[data-testid="app-footer"]');
  }
  // Add footer specific methods
}
