import { Locator, Page } from '@playwright/test';
import { LocatorManager } from '../locators/LocatorManager';

export abstract class BaseComponent {
    protected page: Page;
    protected root: Locator;
    protected locatorManager: LocatorManager;

    constructor(page: Page, rootLocator: string) {
        this.page = page;
        this.locatorManager = new LocatorManager(page);
        this.root = this.locatorManager.getLocator(rootLocator, []);
    }

    /**
     * Returns the root locator of the component.
     * @returns {Locator}
     */
    get component(): Locator {
        return this.root;
    }

    /**
     * Checks if the component is visible on the page.
     * @returns {Promise<boolean>}
     */
    async isVisible(): Promise<boolean> {
        return this.root.isVisible();
    }

    /**
     * Clicks on the component.
     */
    async click(): Promise<void> {
        await this.root.click();
    }
}
