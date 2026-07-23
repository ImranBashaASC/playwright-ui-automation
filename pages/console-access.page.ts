
import { type Locator, type Page } from '@playwright/test';

/**
 * @class ConsoleAccessPage
 * @description Represents the page objects and actions related to the console access workflow.
 */
export class ConsoleAccessPage {
  readonly page: Page;
  readonly enterpriseAccessButton: Locator;
  readonly userProfileButton: Locator;
  readonly switchToConsoleButton: Locator;
  readonly approveButton: Locator;
  readonly consoleHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Locators are defined using user-facing roles and text as per best practices.
    this.enterpriseAccessButton = page.getByRole('button', { name: 'Enter with Enterprise Access' });
    this.userProfileButton = page.getByRole('button', { name: 'User Profile' });
    this.switchToConsoleButton = page.getByRole('menuitem', { name: 'Switch to console' });
    this.approveButton = page.getByRole('button', { name: 'Approve' });
    this.consoleHeader = page.getByRole('heading', { name: 'Console Dashboard' });
  }

  /**
   * Navigates to the specified URL.
   * @param {string} url - The URL to navigate to.
   */
  async goto(url: string) {
    await this.page.goto(url);
  }

  /**
   * Clicks the 'Enter with Enterprise Access' button to initiate login.
   */
  async clickEnterpriseAccess() {
    await this.enterpriseAccessButton.click();
  }

  /**
   * Clicks the user profile button to open the profile menu.
   */
  async clickUserProfile() {
    await this.userProfileButton.click();
  }

  /**
   * Clicks the 'Switch to console' option from the user profile menu.
   */
  async clickSwitchToConsole() {
    await this.switchToConsoleButton.click();
  }

  /**
   * Clicks the 'Approve' button to confirm console access.
   */
  async clickApprove() {
    await this.approveButton.click();
  }
}
