import { Locator, Page, expect } from '@playwright/test';
import { MyLogger } from '../utils/logger';

export class BasePage {
  readonly page: Page;
  protected logger;

  constructor(page: Page) {
    this.page = page;
    this.logger = MyLogger.getLogger(this.constructor.name);
  }

  async navigate(url: string): Promise<void> {
    this.logger.info(`Navigating to ${url}`);
    await this.page.goto(url);
  }

  async click(locator: Locator | string, options?: { force?: boolean; timeout?: number }): Promise<void> {
    const target = typeof locator === 'string' ? this.page.locator(locator) : locator;
    this.logger.info(`Clicking on element: ${locator.toString()}`);
    await target.click(options);
  }

  async fill(locator: Locator | string, text: string, options?: { timeout?: number }): Promise<void> {
    const target = typeof locator === 'string' ? this.page.locator(locator) : locator;
    this.logger.info(`Filling element ${locator.toString()} with text: ${text}`);
    await target.fill(text, options);
  }

  async selectOption(locator: Locator | string, value: string, options?: { timeout?: number }): Promise<void> {
    const target = typeof locator === 'string' ? this.page.locator(locator) : locator;
    this.logger.info(`Selecting option ${value} for element ${locator.toString()}`);
    await target.selectOption(value, options);
  }

  async hover(locator: Locator | string, options?: { timeout?: number }): Promise<void> {
    const target = typeof locator === 'string' ? this.page.locator(locator) : locator;
    this.logger.info(`Hovering over element ${locator.toString()}`);
    await target.hover(options);
  }

  async waitForElementVisible(locator: Locator | string, options?: { timeout?: number }): Promise<void> {
    const target = typeof locator === 'string' ? this.page.locator(locator) : locator;
    this.logger.info(`Waiting for element ${locator.toString()} to be visible`);
    await target.waitFor({ state: 'visible', ...options });
  }

  async takeScreenshot(path: string): Promise<void> {
    this.logger.info(`Taking screenshot and saving to ${path}`);
    await this.page.screenshot({ path });
  }

  async assertElementIsVisible(locator: Locator | string): Promise<void> {
    const target = typeof locator === 'string' ? this.page.locator(locator) : locator;
    this.logger.info(`Asserting element ${locator.toString()} is visible`);
    await expect(target).toBeVisible();
  }

  async assertTextEquals(locator: Locator | string, expectedText: string): Promise<void> {
    const target = typeof locator === 'string' ? this.page.locator(locator) : locator;
    this.logger.info(`Asserting text of ${locator.toString()} equals '${expectedText}'`);
    await expect(target).toHaveText(expectedText);
  }

  async assertUrl(expectedUrl: string | RegExp): Promise<void> {
    this.logger.info(`Asserting URL is '${expectedUrl}'`);
    await expect(this.page).toHaveURL(expectedUrl);
  }
}
