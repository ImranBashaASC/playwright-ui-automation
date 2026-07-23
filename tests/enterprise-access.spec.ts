
import { test, expect } from '@playwright/test';
import { ConsoleAccessPage } from '../pages/console-access.page';
import { testData } from '../test-data/enterprise-access.data';

/**
 * @file enterprise-access.spec.ts
 * @description This file contains E2E tests for the Enterprise Access and console approval workflow.
 * @summary
 * Test Case: Verify user can access console through Enterprise Access and approve access
 * Module: Authentication / User Profile
 * Priority: High
 * Type: Functional Test
 */
test.describe('Enterprise Access to Console Workflow', () => {
  let consoleAccessPage: ConsoleAccessPage;

  // Step 1 & 2: Launch browser and navigate to the URL before each test
  test.beforeEach(async ({ page }) => {
    consoleAccessPage = new ConsoleAccessPage(page);
    await consoleAccessPage.goto(testData.url);
  });

  /**
   * @test {Verify user can access console through Enterprise Access and approve access}
   * @description
   * This test verifies the end-to-end journey of a user authenticating via Enterprise Access,
   * navigating to their profile, switching to the console, approving the access request,
   * and successfully landing on the console dashboard.
   * @tags {@smoke} {@regression}
   */
  test('should allow a user to access the console via Enterprise Access and self-approval @smoke', async () => {
    // Step 3: Click "Enter with Enterprise Access"
    await consoleAccessPage.clickEnterpriseAccess();
    // Note: Step 4 (Enterprise Access authentication) is assumed to be handled by the environment/browser state.

    // Step 5: Click "User Profile"
    await consoleAccessPage.clickUserProfile();

    // Step 6: Click "Switch to console"
    await consoleAccessPage.clickSwitchToConsole();

    // Step 7: Click "Approve"
    await consoleAccessPage.clickApprove();

    // Step 8: Verify console is loaded successfully
    await expect(consoleAccessPage.consoleHeader).toBeVisible();
    await expect(consoleAccessPage.consoleHeader).toHaveText('Console Dashboard');
  });
});
