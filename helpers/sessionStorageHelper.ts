
import { Page } from '@playwright/test';

export class SessionStorageHelper {
  static async setItem(page: Page, key: string, value: any): Promise<void> {
    await page.evaluate(({ key, value }) => {
      sessionStorage.setItem(key, JSON.stringify(value));
    }, { key, value });
  }

  static async getItem(page: Page, key: string): Promise<any> {
    const value = await page.evaluate((key) => {
      return sessionStorage.getItem(key);
    }, key);
    return value ? JSON.parse(value) : null;
  }
}
