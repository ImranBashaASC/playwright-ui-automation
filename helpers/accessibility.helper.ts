import { Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

export class AccessibilityHelper {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Runs Axe accessibility scan on the current page.
     * @param {string[]} [tags] - Optional array of Axe tags to run (e.g., ['wcag2a', 'wcag2aa']).
     * @returns {Promise<any>} The Axe results object.
     */
    async checkAccessibility(tags?: string[]) {
        const accessibilityScanResults = await new AxeBuilder({ page })
            .withTags(tags || ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
            .analyze();

        return accessibilityScanResults;
    }
}
