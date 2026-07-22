
import { Page } from '@playwright/test';
import path from 'path';

export class ScreenshotUtility {
  static async takeFullPageScreenshot(page: Page, name: string): Promise<void> {
    const screenshotPath = path.resolve(__dirname, `../screenshots/${name}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
  }

  static async takeElementScreenshot(page: Page, selector: string, name:string): Promise<void> {
    const screenshotPath = path.resolve(__dirname, `../screenshots/${name}.png`);
    const element = page.locator(selector);
    await element.screenshot({ path: screenshotPath });
  }
}
