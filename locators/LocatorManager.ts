
import { Page, Locator } from '@playwright/test';
import logger from '../utils/Logger';

export class LocatorManager {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Attempts to find a locator using a primary selector, with fallback to other selectors.
   * This provides a basic self-healing mechanism.
   * The order of preference is: id, data-testid, aria-label, name, css, xpath.
   * @param primarySelector - The main selector to try first.
   * @param fallbackSelectors - An array of selectors to try if the primary one fails.
   * @returns A Playwright Locator.
   */
  getLocator(primarySelector: string, fallbackSelectors: string[] = []): Locator {
    const selectors = [primarySelector, ...fallbackSelectors];
    let lastError: any = null;

    for (const selector of selectors) {
      try {
        const locator = this.page.locator(selector);
        // A quick check to see if the element might exist.
        // Note: This doesn't guarantee it's visible or interactive.
        // The actual action (click, fill) will perform the real wait.
        if (this.isPotentiallyValid(locator)) {
          if (selector !== primarySelector) {
            logger.warn(`Primary locator "${primarySelector}" failed. Using fallback: "${selector}"`);
          }
          return locator;
        }
      } catch (error) {
        lastError = error;
      }
    }

    logger.error(`All locators failed. Primary: "${primarySelector}", Fallbacks: [${fallbackSelectors.join(', ')}]`);
    // Return the locator for the primary selector so Playwright's error message is clear.
    return this.page.locator(primarySelector);
  }

  /**
   * A helper to quickly check if a locator might be valid without waiting.
   * This is a simplified check. In a real scenario, you might want a more
   * sophisticated way to validate a selector before returning it.
   */
  private isPotentiallyValid(locator: Locator): boolean {
    // This is a placeholder for a more complex validation logic.
    // For now, we just return true and let the action (e.g., click) handle the waiting and erroring.
    return true;
  }
}
