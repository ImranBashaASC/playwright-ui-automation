
import { Locator, Page, expect } from '@playwright/test';
import logger from '../utils/Logger';
import { WaitUtility } from '../utils/WaitUtility';
import { LocatorManager } from '../locators/LocatorManager';

export class BasePage {
  readonly page: Page;
  readonly waitUtility: WaitUtility;
  readonly locatorManager: LocatorManager;

  constructor(page: Page) {
    this.page = page;
    this.waitUtility = new WaitUtility(page);
    this.locatorManager = new LocatorManager(page);
  }

  async navigate(path: string): Promise<void> {
    logger.info(`Navigating to ${path}`);
    await this.page.goto(path);
  }

  async click(
    primarySelector: string,
    fallbackSelectors: string[] = [],
    options?: {
      force?: boolean;
      timeout?: number;
    }
  ): Promise<void> {
    const locator = this.locatorManager.getLocator(primarySelector, fallbackSelectors);
    logger.info(`Clicking on element: ${primarySelector}`);
    await locator.waitFor({ state: 'visible', timeout: options?.timeout || 10000 });
    await locator.click(options);
  }

  async fill(
    primarySelector: string,
    text: string,
    fallbackSelectors: string[] = [],
    options?: {
      force?: boolean;
      timeout?: number;
    }
  ): Promise<void> {
    const locator = this.locatorManager.getLocator(primarySelector, fallbackSelectors);
    logger.info(`Filling "${text}" into element: ${primarySelector}`);
    await locator.waitFor({ state: 'editable', timeout: options?.timeout || 10000 });
    await locator.fill(text, options);
  }

  async selectOption(
    primarySelector: string,
    value: string,
    fallbackSelectors: string[] = []
  ): Promise<void> {
    const locator = this.locatorManager.getLocator(primarySelector, fallbackSelectors);
    logger.info(`Selecting option "${value}" for element: ${primarySelector}`);
    await locator.waitFor({ state: 'visible' });
    await locator.selectOption(value);
  }

  async uploadFile(primarySelector: string, filePath: string): Promise<void> {
    logger.info(`Uploading file "${filePath}" to element: ${primarySelector}`);
    const fileChooserPromise = this.page.waitForEvent('filechooser');
    await this.click(primarySelector);
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(filePath);
  }

  async downloadFile(primarySelector: string): Promise<string> {
    logger.info(`Downloading file from element: ${primarySelector}`);
    const downloadPromise = this.page.waitForEvent('download');
    await this.click(primarySelector);
    const download = await downloadPromise;
    const path = `downloads/${download.suggestedFilename()}`;
    await download.saveAs(path);
    return path;
  }

  async hover(primarySelector: string): Promise<void> {
    const locator = this.locatorManager.getLocator(primarySelector);
    logger.info(`Hovering over element: ${primarySelector}`);
    await locator.waitFor({ state: 'visible' });
    await locator.hover();
  }

  async dragAndDrop(sourceSelector: string, targetSelector: string): Promise<void> {
    logger.info(`Dragging from ${sourceSelector} to ${targetSelector}`);
    await this.page.dragAndDrop(sourceSelector, targetSelector);
  }

  async scrollIntoView(primarySelector: string): Promise<void> {
    const locator = this.locatorManager.getLocator(primarySelector);
    logger.info(`Scrolling element into view: ${primarySelector}`);
    await locator.scrollIntoViewIfNeeded();
  }

  async takeScreenshot(path: string): Promise<void> {
    logger.info(`Taking screenshot and saving to: ${path}`);
    await this.page.screenshot({ path });
  }

  // Assertion Methods
  async expectToBeVisible(selector: string): Promise<void> {
    const locator = this.locatorManager.getLocator(selector);
    await expect(locator).toBeVisible();
  }

  async expectToHaveText(selector: string, text: string | RegExp): Promise<void> {
    const locator = this.locatorManager.getLocator(selector);
    await expect(locator).toHaveText(text);
  }

  async expectToContainText(selector: string, text: string | RegExp): Promise<void> {
    const locator = this.locatorManager.getLocator(selector);
    await expect(locator).toContainText(text);
  }

  async expectToHaveAttribute(selector: string, attribute: string, value: string | RegExp): Promise<void> {
    const locator = this.locatorManager.getLocator(selector);
    await expect(locator).toHaveAttribute(attribute, value);
  }

  getLocator(selector: string): Locator {
    return this.page.locator(selector);
  }
}
