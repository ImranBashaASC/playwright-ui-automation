
import { Page } from '@playwright/test';
import { BaseComponent } from './BaseComponent';

export class LeftNavigationComponent extends BaseComponent {
  constructor(page: Page) {
    super(page, 'nav[data-testid="left-nav"]');
  }
  // Add left navigation specific methods
}
