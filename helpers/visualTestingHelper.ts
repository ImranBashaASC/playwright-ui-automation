
import { Page, expect } from '@playwright/test';

export class VisualTestingHelper {
  /**
   * Takes a screenshot and compares it to a golden/snapshot image.
   * @param page The Playwright Page object.
   * @param name A unique name for the snapshot.
   * @param options Options for screenshot comparison, e.g., threshold.
   */
  static async expectToMatchSnapshot(page: Page, name: string, options?: { threshold?: number }): Promise<void> {
    await expect(page).toHaveScreenshot(`${name}.png`, options);
  }

  /**
   * Takes a screenshot of a specific element and compares it to a snapshot.
   * @param page The Playwright Page object.
   * @param selector The selector for the element.
   * @param name A unique name for the snapshot.
   * @param options Options for screenshot comparison.
   */
  static async expectElementToMatchSnapshot(page: Page, selector: string, name: string, options?: { threshold?: number }): Promise<void> {
    const element = page.locator(selector);
    await expect(element).toHaveScreenshot(`${name}.png`, options);
  }
}
