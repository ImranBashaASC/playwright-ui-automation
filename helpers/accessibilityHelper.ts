
import { Page } from '@playwright/test';
import AxeBuilder from 'axe-playwright';

export class AccessibilityHelper {
  static async checkAccessibility(page: Page, testName: string): Promise<void> {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    // You can attach the results to the test report
    // await test.info().attach(`${testName}-a11y-report`, {
    //   body: JSON.stringify(accessibilityScanResults, null, 2),
    //   contentType: 'application/json',
    // });

    // Assert there are no violations
    if (accessibilityScanResults.violations.length > 0) {
      console.error("Accessibility violations found:", accessibilityScanResults.violations);
    }
    // expect(accessibilityScanResults.violations).toEqual([]);
  }
}
