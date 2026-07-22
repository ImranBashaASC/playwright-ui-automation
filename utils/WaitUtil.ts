import { Page } from '@playwright/test';

/**
 * Utility class for custom wait conditions.
 * Note: It's best practice to rely on Playwright's auto-waiting.
 * This utility should be used for special cases where auto-waiting is not sufficient.
 */
export class WaitUtil {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Waits for a specific network request to complete.
     * @param {string | RegExp} url - The URL of the request to wait for.
     * @param {number} [timeout] - Optional timeout in milliseconds.
     * @returns {Promise<void>}
     */
    async waitForResponse(url: string | RegExp, timeout?: number): Promise<void> {
        await this.page.waitForResponse(url, { timeout });
    }

    /**
     * Waits for the page to be in a completely loaded state.
     * @param {'load' | 'domcontentloaded' | 'networkidle'} [state] - The state to wait for.
     * @param {number} [timeout] - Optional timeout in milliseconds.
     */
    async waitForLoadState(state: 'load' | 'domcontentloaded' | 'networkidle' = 'networkidle', timeout?: number): Promise<void> {
        await this.page.waitForLoadState(state, { timeout });
    }

    /**
     * A simple fixed wait. AVOID USING THIS. Use Playwright's web-first assertions instead.
     * Included here for demonstration or emergency use only.
     * @param {number} milliseconds - The duration to wait.
     */
    async fixedWait(milliseconds: number): Promise<void> {
        console.warn(`Using a fixed wait of ${milliseconds}ms. This is not a recommended practice.`);
        await this.page.waitForTimeout(milliseconds);
    }
}
