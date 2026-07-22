import { BrowserContext, Page } from '@playwright/test';

/**
 * Helper class for managing browser storage (cookies, local storage, session storage).
 */
export class StorageHelper {
    private page: Page;
    private context: BrowserContext;

    constructor(page: Page) {
        this.page = page;
        this.context = page.context();
    }

    // --- Cookie Management ---

    /**
     * Gets all cookies for the current context.
     * @returns {Promise<any[]>}
     */
    async getCookies(): Promise<any[]> {
        return this.context.cookies();
    }

    /**
     * Adds a cookie to the current context.
     * @param {string} name - The name of the cookie.
     * @param {string} value - The value of the cookie.
     * @param {string} domain - The domain of the cookie.
     * @param {string} [path] - The path of the cookie.
     */
    async addCookie(name: string, value: string, domain: string, path: string = '/'): Promise<void> {
        await this.context.addCookies([{ name, value, domain, path }]);
    }

    /**
     * Clears all cookies.
     */
    async clearCookies(): Promise<void> {
        await this.context.clearCookies();
    }

    // --- Local Storage Management ---

    /**
     * Sets a value in local storage.
     * @param {string} key - The key for the local storage item.
     * @param {any} value - The value to store (will be JSON.stringified).
     */
    async setLocalStorage(key: string, value: any): Promise<void> {
        await this.page.evaluate(({ key, value }) => {
            localStorage.setItem(key, JSON.stringify(value));
        }, { key, value });
    }

    /**
     * Gets a value from local storage.
     * @param {string} key - The key of the item to retrieve.
     * @returns {Promise<any>} The parsed value from local storage.
     */
    async getLocalStorage(key: string): Promise<any> {
        const value = await this.page.evaluate((key) => localStorage.getItem(key), key);
        return value ? JSON.parse(value) : null;
    }

    /**
     * Removes an item from local storage.
     * @param {string} key - The key of the item to remove.
     */
    async removeLocalStorage(key: string): Promise<void> {
        await this.page.evaluate((key) => localStorage.removeItem(key), key);
    }

    // --- Session Storage Management ---

    /**
     * Sets a value in session storage.
     * @param {string} key - The key for the session storage item.
     * @param {any} value - The value to store (will be JSON.stringified).
     */
    async setSessionStorage(key: string, value: any): Promise<void> {
        await this.page.evaluate(({ key, value }) => {
            sessionStorage.setItem(key, JSON.stringify(value));
        }, { key, value });
    }

    /**
     * Gets a value from session storage.
     * @param {string} key - The key of the item to retrieve.
     * @returns {Promise<any>} The parsed value from session storage.
     */
    async getSessionStorage(key: string): Promise<any> {
        const value = await this.page.evaluate((key) => sessionStorage.getItem(key), key);
        return value ? JSON.parse(value) : null;
    }
}
