import { test, expect } from '../../fixtures/customFixtures';

test.describe('Login Functionality', () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigate();
    });

    test('should allow a user to log in with valid credentials @Smoke', async ({ page, loginPage, testData }) => {
        await loginPage.login(testData.validUser.email, testData.validUser.password);
        
        // Assertion: Check if the URL changed to the account page
        await expect(page).toHaveURL('**/account/account');
        
        // Assertion: Check if a known element on the account page is visible
        await expect(page.locator('h2:has-text("My Account")')).toBeVisible();
    });

    test('should show an error message with invalid credentials @Regression', async ({ loginPage, testData }) => {
        await loginPage.login(testData.invalidUser.email, testData.invalidUser.password);
        
        // Assertion: Use the method from the page object
        await loginPage.assertLoginErrorVisible();
    });

    test('should use an authenticated fixture @Critical', async ({ authenticatedUser, page }) => {
        // This test starts with the user already logged in, thanks to the 'authenticatedUser' fixture.
        // We can directly navigate to a protected route or perform actions as a logged-in user.
        await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/edit');
        
        // Assertion: Verify we are on the correct page by checking for a unique element
        await expect(page.locator('#input-firstname')).toBeVisible();
    });
});
