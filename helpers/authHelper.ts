
import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

export class AuthHelper {
  private page: Page;
  private loginPage: LoginPage;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
  }

  async login(username: string, password: string): Promise<void> {
    await this.loginPage.navigate();
    await this.loginPage.login(username, password);
    // Add waits or assertions to ensure login is complete
    await this.page.waitForURL('**/dashboard');
  }

  async saveState(path: string = 'storageState.json'): Promise<void> {
    await this.page.context().storageState({ path });
  }
}
