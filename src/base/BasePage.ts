import { Page, Locator, expect } from '@playwright/test';
import { logger } from '@/utils/logger';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string): Promise<void> {
    logger.info(`Navigating to ${url}`);
    await this.page.goto(url);
  }

  async click(locator: Locator, options?: { force?: boolean; timeout?: number }): Promise<void> {
    logger.info(`Clicking on element with locator: ${locator}`);
    await locator.waitFor({ state: 'visible', timeout: options?.timeout });
    await locator.click(options);
  }

  async fill(locator: Locator, text: string, options?: { timeout?: number }): Promise<void> {
    logger.info(`Filling element with locator: ${locator} with text: ${text}`);
    await locator.waitFor({ state: 'visible', timeout: options?.timeout });
    await locator.fill(text);
  }

  async getText(locator: Locator, options?: { timeout?: number }): Promise<string> {
    logger.info(`Getting text from element with locator: ${locator}`);
    await locator.waitFor({ state: 'visible', timeout: options?.timeout });
    return locator.textContent() ?? '';
  }

  async selectOption(locator: Locator, value: string, options?: { timeout?: number }): Promise<void> {
    logger.info(`Selecting option ${value} from dropdown with locator: ${locator}`);
    await locator.waitFor({ state: 'visible', timeout: options?.timeout });
    await locator.selectOption(value);
  }

  async expectToBeVisible(locator: Locator, options?: { timeout?: number }): Promise<void> {
    logger.info(`Expecting element with locator: ${locator} to be visible`);
    await expect(locator).toBeVisible(options);
  }

  async expectToHaveText(locator: Locator, text: string, options?: { timeout?: number }): Promise<void> {
    logger.info(`Expecting element with locator: ${locator} to have text: ${text}`);
    await expect(locator).toHaveText(text, options);
  }
}
