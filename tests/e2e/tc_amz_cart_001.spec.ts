
import { test, expect } from '../../src/fixtures/custom-fixtures';
import { HomePage } from '../../src/pages/HomePage';
import { SearchResultsPage } from '../../src/pages/SearchResultsPage';
import { ProductDetailsPage } from '../../src/pages/ProductDetailsPage';
import { CartPage } from '../../src/pages/CartPage';
import * as testData from '../test-data/tc_amz_cart_001.data.json';

test.describe('TC_AMZ_CART_001: Amazon Shopping Cart E2E', () => {
  let homePage: HomePage;
  let searchResultsPage: SearchResultsPage;
  let productDetailsPage: ProductDetailsPage;
  let cartPage: CartPage;
  let productDetails: { name: string; price: string; };

  test('@E2E @Regression: Verify user can search and add a Logitech wireless mouse to cart', async ({ page }) => {
    
    await test.step('Step 1 & 2: Launch Amazon India and verify home page', async () => {
      homePage = new HomePage(page);
      await homePage.navigate();
      await homePage.assertHomePageIsDisplayed();
    });

    await test.step('Step 3, 4 & 5: Search for product', async () => {
      await homePage.header.searchForProduct(testData.searchKeyword);
    });

    await test.step('Step 6 & 7: Verify search results', async () => {
      searchResultsPage = new SearchResultsPage(page);
      await searchResultsPage.assertSearchResultsDisplayed();
      await searchResultsPage.assertBrandResultIsVisible(testData.expectedBrand);
    });

    await test.step('Step 8: Select the first product', async () => {
      const newPage = await searchResultsPage.selectFirstLogitechProduct();
      productDetailsPage = new ProductDetailsPage(newPage);
      // The test now continues on the new product page
      page = newPage;
    });

    await test.step('Step 9: Capture product information', async () => {
      productDetails = await productDetailsPage.captureProductDetails();
      expect(productDetails.name).not.toBeNull();
      expect(productDetails.price).not.toBeNull();
    });

    await test.step('Step 10 & 11: Add product to cart', async () => {
      await productDetailsPage.addProductToCart();
      await productDetailsPage.assertProductAddedToCart();
    });

    await test.step('Step 12: Navigate to Cart', async () => {
        await productDetailsPage.navigateToCart();
        cartPage = new CartPage(page);
        await expect(page).toHaveTitle(/Amazon.in Shopping Cart/);
    });

    await test.step('Step 13: Verify product exists in cart', async () => {
        await cartPage.assertProductInCart(productDetails.name);
    });

    await test.step('Step 14: Verify product quantity is 1', async () => {
        await cartPage.assertProductQuantity(1);
    });

    await test.step('Step 15: Verify product name in cart', async () => {
        await cartPage.assertProductInCart(productDetails.name);
    });

    await test.step('Step 16: Verify product price in cart', async () => {
        await cartPage.assertProductPrice(productDetails.price);
    });

    await test.step('Step 17: Verify cart subtotal is greater than zero', async () => {
        await cartPage.assertCartSubtotalIsGreaterThanZero();
    });

    await test.step('Step 18: Take screenshot of cart page', async () => {
        await cartPage.takeCartScreenshot();
    });

    await test.step('Step 19: End test execution', async () => {
        // Test completes, post-conditions are met by default
    });
  });
});
