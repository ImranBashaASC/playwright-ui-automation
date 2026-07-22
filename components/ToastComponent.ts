
import { Page } from '@playwright/test';
import { BaseComponent } from './BaseComponent';

export class ToastComponent extends BaseComponent {
  constructor(page: Page) {
    super(page, 'div[data-testid="toast-message"]');
  }
  // Add toast specific methods
}
