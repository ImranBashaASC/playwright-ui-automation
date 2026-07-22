
import { BrowserContext } from '@playwright/test';

export class CookieHelper {
  static async getCookies(context: BrowserContext): Promise<any[]> {
    return context.cookies();
  }

  static async addCookies(context: BrowserContext, cookies: any[]): Promise<void> {
    await context.addCookies(cookies);
  }
}
