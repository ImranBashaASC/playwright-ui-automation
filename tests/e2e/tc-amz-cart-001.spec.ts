
import { test, expect } from '../src/fixtures/custom-fixtures';
import { HomePage } from '../src/pages/HomePage';
import { SearchResultsPage } from '../src/pages/SearchResultsPage';
import { ProductDetailPage } from '../src/pages/ProductDetailPage';
import { CartPage } from '../src/pages/CartPage';
import { HeaderComponent } from '../src/components/HeaderComponent';
import * as testData from '../src/data/amazon-cart-test-data.json';

test.describe('TC_AMZ_CART_001: Amazon Cart Flow', () => {
  let homePage: HomePage;
  let searchResultsPage: SearchResultsPage;
  let productDetailPage: ProductDetailPage;
  let cartPage: CartPage;
  let productDetails: { name: string; price: string; };

  test('Verify user can search and add a Logitech wireless mouse to cart @E2E', async ({ page, context }) => {
    
    await test.step('Step 1 & 2: Launch Amazon India and verify home page', async () => {
      homePage = new HomePage(page);
      await homePage.goto();
      await homePage.assertOnHomePage();
    });

    await test.step('Step 3, 4 & 5: Search for a product', async () => {
      await homePage.header.searchFor(testData.searchKeyword);
    });

    await test.step('Step 6 & 7: Verify search results', async () => {
      searchResultsPage = new SearchResultsPage(page);
      await searchResultsPage.assertSearchResultsPageIsDisplayed();
      await searchResultsPage.assertResultContainsBrand(testData.expectedBrand);
    });

    await test.step('Step 8: Select the first Logitech product', async () => {
      const productPagePromise = context.waitForEvent('page');
      await searchResultsPage.selectFirstProductByBrand(testData.expectedBrand);
      const newPage = await productPagePromise;
      await newPage.waitForLoadState();
      productDetailPage = new ProductDetailPage(newPage);
    });

    await test.step('Step 9 & 10: Capture product details and verify Add to Cart button', async () => {
      productDetails = await productDetailPage.getProductDetails();
      expect(productDetails.name).toContain(testData.expectedBrand);
      await productDetailPage.assertAddToCartButtonIsVisible();
    });

    await test.step('Step 11: Add product to cart', async () => {
      await productDetailPage.clickAddToCart();
      await productDetailPage.assertProductAddedToCart();
    });

    await test.step('Step 12: Navigate to Cart', async () => {
      const headerComponent = new HeaderComponent(productDetailPage.page);
      await headerComponent.navigateToCart();
      cartPage = new CartPage(productDetailPage.page);
    });

    await test.step('Step 13, 14, 15, 16: Verify product details in cart', async () => {
      await cartPage.assertProductInCart(productDetails.name);
      await cartPage.assertProductQuantity(1);
      await cartPage.assertProductPrice(productDetails.price);
    });

    await test.step('Step 17: Verify cart subtotal', async () => {
      await cartPage.assertCartSubtotalIsGreaterThanZero();
    });

    await test.step('Step 18: Take screenshot of cart page', async () => {
      await cartPage.page.screenshot({ path: 'screenshots/tc-amz-cart-001-cart-page.png', fullPage: true });
    });
  });
});
