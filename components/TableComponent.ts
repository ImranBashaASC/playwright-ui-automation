
import { Page, Locator } from '@playwright/test';
import { BaseComponent } from './BaseComponent';

export class TableComponent extends BaseComponent {
  constructor(page: Page, tableSelector: string) {
    super(page, tableSelector);
  }

  async getRowCount(): Promise<number> {
    return this.container.locator('tbody tr').count();
  }

  async getCell(row: number, column: number): Promise<Locator> {
    return this.container.locator(`tbody tr:nth-child(${row}) td:nth-child(${column})`);
  }
}
