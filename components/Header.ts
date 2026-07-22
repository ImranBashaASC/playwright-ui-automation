import { Page } from '@playwright/test';
import { BaseComponent } from './BaseComponent';

export class Header extends BaseComponent {
    constructor(page: Page) {
        // Assuming the header has a unique identifier like 'header' or a specific class
        super(page, 'header');
    }

    // Specific locators within the Header component
    get logo() {
        return this.component.locator('.logo');
    }

    get searchInput() {
        return this.component.locator('input[name="search"]');
    }

    get searchButton() {
        return this.component.locator('button.search-btn');
    }

    get myAccountLink() {
        return this.component.locator('#my-account');
    }

    // Business methods for interacting with the Header
    async searchFor(product: string) {
        await this.searchInput.fill(product);
        await this.searchButton.click();
    }

    async navigateToMyAccount() {
        await this.myAccountLink.click();
    }
}
