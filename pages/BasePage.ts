import { Locator, Page, expect } from '@playwright/test';
import { AppConstants } from '../constants/app.constants';
import { LocatorManager } from '../locators/LocatorManager';
import logger from '../utils/Logger';

export abstract class BasePage {
    protected page: Page;
    protected locatorManager: LocatorManager;

    constructor(page: Page) {
        this.page = page;
        this.locatorManager = new LocatorManager(page);
    }

    /**
     * Navigates to a specified URL.
     * @param {string} url - The URL to navigate to.
     */
    async navigate(url: string): Promise<void> {
        logger.info(`Navigating to ${url}`);
        await this.page.goto(url);
    }

    // --- Interaction Methods ---

    async click(locator: Locator, elementName: string): Promise<void> {
        logger.info(`Clicking on ${elementName}`);
        await locator.waitFor({ state: 'visible', timeout: AppConstants.TIMEOUTS.MEDIUM });
        await locator.click();
    }

    async fill(locator: Locator, text: string, elementName: string): Promise<void> {
        logger.info(`Filling '${text}' into ${elementName}`);
        await locator.waitFor({ state: 'visible', timeout: AppConstants.TIMEOUTS.MEDIUM });
        await locator.fill(text);
    }

    async selectOption(locator: Locator, value: string, elementName: string): Promise<void> {
        logger.info(`Selecting option '${value}' from ${elementName}`);
        await locator.waitFor({ state: 'visible', timeout: AppConstants.TIMEOUTS.MEDIUM });
        await locator.selectOption(value);
    }

    async uploadFile(locator: Locator, filePath: string, elementName: string): Promise<void> {
        logger.info(`Uploading file '${filePath}' to ${elementName}`);
        await locator.setInputFiles(filePath);
    }

    async downloadFile(locator: Locator, elementName: string): Promise<string> {
        logger.info(`Downloading file from ${elementName}`);
        const downloadPromise = this.page.waitForEvent('download');
        await locator.click();
        const download = await downloadPromise;
        const path = `downloads/${download.suggestedFilename()}`;
        await download.saveAs(path);
        return path;
    }

    async hover(locator: Locator, elementName: string): Promise<void> {
        logger.info(`Hovering over ${elementName}`);
        await locator.hover();
    }

    async dragAndDrop(source: Locator, target: Locator, sourceName: string, targetName: string): Promise<void> {
        logger.info(`Dragging ${sourceName} to ${targetName}`);
        await source.dragTo(target);
    }

    async scrollIntoView(locator: Locator, elementName: string): Promise<void> {
        logger.info(`Scrolling ${elementName} into view`);
        await locator.scrollIntoViewIfNeeded();
    }

    // --- Wait Methods ---

    async waitForElementVisible(locator: Locator, timeout?: number): Promise<void> {
        await locator.waitFor({ state: 'visible', timeout: timeout || AppConstants.TIMEOUTS.MEDIUM });
    }

    async waitForNetworkIdle(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
    }

    // --- Assertion Methods ---

    async expectToBeVisible(locator: Locator, elementName: string): Promise<void> {
        logger.info(`Asserting that ${elementName} is visible`);
        await expect(locator).toBeVisible();
    }

    async expectToHaveText(locator: Locator, expectedText: string, elementName: string): Promise<void> {
        logger.info(`Asserting that ${elementName} has text '${expectedText}'`);
        await expect(locator).toHaveText(expectedText);
    }

    async expectToContainText(locator: Locator, expectedText: string, elementName: string): Promise<void> {
        logger.info(`Asserting that ${elementName} contains text '${expectedText}'`);
        await expect(locator).toContainText(expectedText);
    }

    // --- Screenshot ---

    async takeScreenshot(path: string): Promise<void> {
        logger.info(`Taking screenshot and saving to ${path}`);
        await this.page.screenshot({ path });
    }
}
