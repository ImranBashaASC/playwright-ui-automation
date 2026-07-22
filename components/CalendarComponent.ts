
import { Page } from '@playwright/test';
import { BaseComponent } from './BaseComponent';

export class CalendarComponent extends BaseComponent {
  constructor(page: Page) {
    super(page, 'div[data-testid="calendar"]');
  }
  // Add calendar specific methods
}
