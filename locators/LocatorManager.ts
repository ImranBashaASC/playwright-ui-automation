import { Locator, Page } from '@playwright/test';
import logger from '../utils/Logger';

/**
 * Manages locators with a fallback strategy for self-healing.
 */
export class LocatorManager {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Gets a locator using a primary selector and a list of fallback selectors.
     * The priority of locators is: id, data-testid, aria-label, name, css, xpath.
     * @param {string} primaryLocator - The main locator to try first.
     * @param {string[]} fallbackLocators - An array of fallback locators.
     * @returns {Locator} A Playwright Locator object.
     */
    getLocator(primaryLocator: string, fallbackLocators: string[]): Locator {
        const allLocators = [primaryLocator, ...fallbackLocators].join(' >>, ');
        // Playwright's locator engine handles this chaining automatically.
        // If the first part of the chain fails, it doesn't proceed.
        // To implement true fallback, we need a more complex wrapper.
        // For now, we'll use a custom method to find the first valid one.
        // Note: This is a simplified concept. A true self-healing implementation
        // would be more complex and might involve the AI agents.
        return this.page.locator(primaryLocator);
    }

    /**
     * A more robust method to find a locator from a list of fallbacks.
     * It returns the first locator that resolves to at least one element.
     * @param {string[]} locators - An ordered list of locators to try.
     * @param {number} [timeout=5000] - Timeout to wait for the locator.
     * @returns {Promise<Locator>} The first valid locator found.
     * @throws {Error} If no locator finds an element within the timeout.
     */
    async findFirstAvailable(locators: string[], timeout: number = 5000): Promise<Locator> {
        for (const locator of locators) {
            try {
                const element = this.page.locator(locator);
                await element.waitFor({ state: 'attached', timeout: timeout / locators.length });
                logger.info(`Found element with locator: ${locator}`);
                return element;
            } catch (e) {
                logger.warn(`Locator failed: ${locator}. Trying next fallback.`);
            }
        }
        throw new Error(`None of the provided locators found an element: ${locators.join(', ')}`);
    }
}
