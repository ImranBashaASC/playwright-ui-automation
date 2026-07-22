
import { Page } from '@playwright/test';
import { BaseComponent } from './BaseComponent';

export class PopupComponent extends BaseComponent {
  constructor(page: Page) {
    super(page, 'div[data-testid="popup-container"]');
  }
  // Add popup specific methods
}
