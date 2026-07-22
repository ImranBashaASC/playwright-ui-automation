
import { Page } from '@playwright/test';
import { BaseComponent } from './BaseComponent';

export class TopMenuComponent extends BaseComponent {
  constructor(page: Page) {
    super(page, 'div[data-testid="top-menu"]');
  }
  // Add top menu specific methods
}
