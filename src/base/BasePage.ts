
import { Page, Locator, expect } from '@playwright/test';
import { MyLogger } from '../utils/logger';
import * as winston from 'winston';

export class BasePage {
  readonly page: Page;
  protected logger: winston.Logger;

  constructor(page: Page) {
    this.page = page;
    this.logger = MyLogger.getLogger(this.constructor.name);
  }

  async navigate(url: string): Promise<void> {
    this.logger.info(`Navigating to ${url}`);
    await this.page.goto(url);
  }

  async click(locator: Locator): Promise<void> {
    await locator.click();
  }

  async fill(locator: Locator, text: string): Promise<void> {
    await locator.fill(text);
  }

  async selectOption(locator: Locator, value: string): Promise<void> {
    await locator.selectOption(value);
  }

  async hover(locator: Locator): Promise<void> {
    await locator.hover();
  }

  async waitForElementVisible(locator: Locator, timeout?: number): Promise<void> {
    await expect(locator).toBeVisible({ timeout });
  }

  async assertElementIsVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
    this.logger.info(`Assertion Passed: Element is visible.`);
  }

  async assertTextEquals(locator: Locator, expectedText: string): Promise<void> {
    await expect(locator).toHaveText(expectedText);
    this.logger.info(`Assertion Passed: Text equals "${expectedText}".`);
  }

  async assertUrl(expectedUrl: string | RegExp): Promise<void> {
    await expect(this.page).toHaveURL(expectedUrl);
    this.logger.info(`Assertion Passed: URL is "${expectedUrl}".`);
  }
}
