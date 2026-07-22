import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    // Locators
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly errorMessage: Locator;

    constructor(page: Page) {
        super(page);
        // Initialize locators using a robust strategy
        this.emailInput = this.locatorManager.getLocator('#input-email', ['[name="email"]']);
        this.passwordInput = this.locatorManager.getLocator('#input-password', ['[name="password"]']);
        this.loginButton = this.locatorManager.getLocator('input[value="Login"]', ['button:has-text("Login")']);
        this.errorMessage = this.locatorManager.getLocator('.alert-danger', []);
    }

    /**
     * Navigates to the login page.
     */
    async navigate(): Promise<void> {
        const url = process.env.BASE_URL || 'https://ecommerce-playground.lambdatest.io/index.php?route=account/login';
        await super.navigate(url);
    }

    /**
     * Fills the login form and submits it.
     * @param {string} email - The user's email.
     * @param {string} password - The user's password.
     */
    async login(email: string, password: string): Promise<void> {
        await this.fill(this.emailInput, email, 'Email Input');
        await this.fill(this.passwordInput, password, 'Password Input');
        await this.click(this.loginButton, 'Login Button');
    }

    /**
     * Returns the locator for the error message element.
     * @returns {Locator}
     */
    getErrorMessage(): Locator {
        return this.errorMessage;
    }

    /**
     * Asserts that the login error message is visible.
     */
    async assertLoginErrorVisible(): Promise<void> {
        await this.expectToBeVisible(this.errorMessage, 'Login Error Message');
        await this.expectToContainText(this.errorMessage, 'Warning: No match for E-Mail Address and/or Password.', 'Login Error Message');
    }
}
