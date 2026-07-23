
import { test, expect, Page } from '@playwright/test';
import { AmazonPage } from '../pages/amazon.page';
import * as testData from '../test-data/amazon.data';

test.describe('TC_AMZ_CART_001: Verify user can search and add a Logitech wireless mouse to cart', () => {
  let amazonPage: AmazonPage;
  let newPage: Page;
  let productName: string;
  let productPrice: string;

  test.beforeEach(async ({ page }) => {
    amazonPage = new AmazonPage(page);
    await amazonPage.goto();
  });

  test('should search, add to cart, and verify product details', async ({ page }) => {
    // Steps 1-2: Launch website and verify logo
    await expect(amazonPage.amazonLogo).toBeVisible();

    // Steps 3-5: Search for the product
    await expect(amazonPage.searchTextBox).toBeVisible();
    await expect(amazonPage.searchTextBox).toBeEnabled();
    await amazonPage.searchProduct(testData.searchKeyword);

    // Steps 6-7: Verify search results
    await expect(amazonPage.searchResults.first()).toBeVisible();
    const firstLogitechResult = amazonPage.searchResults.filter({ hasText: testData.expectedBrand }).first();
    await expect(firstLogitechResult).toBeVisible();

    // Step 8: Select the first product and handle new tab
    const pagePromise = page.context().waitForEvent('page');
    await firstLogitechResult.getByRole('link').first().click();
    newPage = await pagePromise;
    await newPage.waitForLoadState();
    
    const productPage = new AmazonPage(newPage);

    // Step 9: Capture product information
    productName = await productPage.productTitle.innerText();
    productPrice = (await productPage.productPrice.first().innerText()).replace(/[^\d.]/g, '');
    console.log(`Product Name: ${productName}`);
    console.log(`Product Price: ${productPrice}`);

    // Steps 10-11: Add to cart
    await expect(productPage.addToCartButton).toBeVisible();
    await expect(productPage.addToCartButton).toBeEnabled();
    await productPage.addToCartButton.click();

    // Step 12: Navigate to Cart
    await expect(productPage.addedToCartMessage).toBeVisible();
    await productPage.goToCartButton.click();
    await newPage.waitForLoadState();

    // Step 13: Verify product exists in cart
    const cartProduct = productPage.cartItems.filter({ hasText: productName });
    await expect(cartProduct).toBeVisible();

    // Step 14: Verify quantity is 1
    await expect(productPage.cartQuantity).toHaveText('1');

    // Step 15: Verify product name matches
    const cartProductName = await cartProduct.locator('.a-truncate-cut').innerText();
    expect(cartProductName.trim()).toEqual(productName.trim());

    // Step 16: Verify product price matches
    const cartProductPrice = (await cartProduct.locator('.sc-product-price').innerText()).replace(/[^\d.]/g, '');
    expect(cartProductPrice).toContain(productPrice);

    // Step 17: Verify cart subtotal
    const subtotalText = await productPage.cartSubtotal.innerText();
    const subtotalValue = parseFloat(subtotalText.replace(/[^\d.]/g, ''));
    expect(subtotalValue).toBeGreaterThan(0);

    // Step 18: Take screenshot
    await newPage.screenshot({ path: 'screenshots/cart-page.png' });
  });
});
