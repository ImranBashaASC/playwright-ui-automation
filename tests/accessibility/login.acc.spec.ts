import { test, expect } from '../../fixtures/customFixtures';
import { AccessibilityHelper } from '../../helpers/accessibility.helper';

test.describe('Login Page Accessibility', () => {

    test('should not have any automatically detectable accessibility issues on the login page @Accessibility', async ({ page }) => {
        await page.goto(process.env.BASE_URL!);
        
        const accessibilityHelper = new AccessibilityHelper(page);
        const accessibilityScanResults = await accessibilityHelper.checkAccessibility();

        // Assert that there are no violations
        expect(accessibilityScanResults.violations).toEqual([]);
    });
});
