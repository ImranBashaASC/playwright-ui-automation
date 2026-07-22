import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

/**
 * Helper class for authentication-related actions.
 */
export class AuthHelper {
    private page: Page;
    private loginPage: LoginPage;

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
    }

    /**
     * Logs in a user and saves the session state to a file.
     * @param {string} email - The user's email.
     * @param {string} password - The user's password.
     * @param {string} storageStatePath - The path to save the storage state.
     */
    async loginAndSaveSession(email: string, password: string, storageStatePath: string): Promise<void> {
        await this.loginPage.navigate();
        await this.loginPage.login(email, password);
        // Add a wait to ensure authentication is complete, e.g., wait for a dashboard element
        await this.page.waitForURL('**/account/account');
        await this.page.context().storageState({ path: storageStatePath });
    }

    /**
     * Logs out the current user.
     */
    async logout(): Promise<void> {
        // Implementation depends on the application's logout mechanism
        // Example:
        // await this.page.click('a:has-text("Logout")');
        // await this.page.waitForURL('**/account/logout');
    }
}
