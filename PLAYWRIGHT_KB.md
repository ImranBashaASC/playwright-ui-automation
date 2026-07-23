# Playwright Test Generation Knowledge Base

This document outlines the strict rules and standards for generating Playwright test scripts. All generated scripts MUST adhere to these guidelines to ensure consistency, maintainability, and stability of the automation framework.

---

## 1. Design Pattern Standards: Page Object Model (POM)

All tests MUST use the Page Object Model (POM) design pattern.

### 1.1. Page Object Encapsulation
- **Purpose**: To encapsulate all information about a specific page of the application, including its elements (locators) and the actions that can be performed on them.
- **Rule**: Each page of the application under test (AUT) MUST have its own corresponding Page Object file in the `pages/` directory.
- **Structure**:
    - A `Page` object class must be the default export.
    - It MUST have a `readonly page: Page` property in its constructor to hold the Playwright `Page` instance.
    - Locators MUST be defined as `readonly` class properties.
    - User actions MUST be implemented as `async` methods within the class (e.g., `async login(username, password)`).

### 1.2. Locator Strategy
- **Strict Rule**: Hardcoded locators (e.g., `page.locator('//button[@id="submit"]')`) are strictly **FORBIDDEN** inside test files (`*.spec.ts`). All locators MUST reside within their respective Page Object files.
- **Preferred Locators**: Always prioritize user-facing, resilient locators in this order:
    1.  `page.getByTestId('your-data-testid')`: The most preferred, stable locator.
    2.  `page.getByRole('button', { name: 'Sign In' })`
    3.  `page.getByText('Welcome back')`
    4.  `page.getByLabel('Username')`
    5.  `page.getByPlaceholder('Enter your email')`
- **Avoid**: Use of fragile XPath and CSS selectors is strongly discouraged. Only use them as a last resort when no other resilient locator is available.

---

## 2. Test File Structure & Best Practices

### 2.1. Filename Convention
- All test files MUST be located in the `tests/` directory.
- All test filenames MUST end with the `.spec.ts` suffix (e.g., `login.spec.ts`).

### 2.2. Test Grouping
- **`test.describe()`**: Every test file MUST start with a `test.describe()` block to group related tests for a feature or page. The description should be clear and concise (e.g., `'Login Page Functionality'`).
- **`test()`**: Individual test cases MUST be defined using the `test()` function.
- **Test Titles**: Test titles MUST be descriptive and include a tag for filtering purposes (e.g., `@smoke`, `@regression`, `@sanity`).
    - **Example**: `test('should allow a user to log in with valid credentials @smoke', async ({ loginPage, homePage }) => { ... });`

### 2.3. Setup and Teardown (Hooks)
- **`test.beforeEach()`**: Use this hook for setup actions that run before each test, such as navigating to a specific page.
    - **Example**: `test.beforeEach(async ({ loginPage }) => { await loginPage.goto(); });`
- **`test.afterEach()`**: Use for cleanup actions after each test (less common but available).

### 2.4. Assertions
- **Explicit Assertions**: All checks MUST use Playwright's built-in `expect()` assertions. Do not use raw JavaScript conditionals (`if/else`) to check application state.
- **Clarity**: Assertions should be explicit and readable.
    - **Good**: `await expect(homePage.welcomeMessage).toBeVisible();`
    - **Bad**: `const isVisible = await homePage.welcomeMessage.isVisible(); if (!isVisible) { throw new Error('Element not visible'); }`

---

## 3. Data & Config Management

### 3.1. Environment Variables
- **Purpose**: To manage environment-specific configurations (URLs, credentials) securely.
- **Rule**: Use `process.env.VARIABLE_NAME` to access environment variables (loaded via `dotenv` in `playwright.config.ts`).
- **NEVER** hardcode sensitive data like passwords or API keys directly in the code.

### 3.2. Test Data
- **Purpose**: To separate test data from test logic.
- **Rule**: Static test data (e.g., user profiles, product details) MUST be stored in JSON files within the `test-data/` directory.
- **Usage**: Import the JSON data directly into your test files.
    - **Example**: `import * as users from '../test-data/users.json';`

---

## 4. Custom Fixtures & Helpers

### 4.1. Consuming Fixtures
- **Purpose**: Fixtures are used to set up a specific environment for a test, such as initializing all required Page Objects. Our framework provides these automatically.
- **Rule**: Your generated test function MUST accept the required Page Objects as parameters. The custom fixture logic in `fixtures/page.fixture.ts` will handle the instantiation.
- **Example**:
  ```typescript
  // Notice loginPage and homePage are passed as arguments
  test('should log in successfully', async ({ loginPage, homePage }) => {
    // The 'loginPage' and 'homePage' objects are ready to use here.
    await loginPage.login('user', 'password');
    await expect(homePage.welcomeMessage).toBeVisible();
  });
  ```

---

## 5. Code Style & Output Requirements

1.  **Language**: All generated code MUST be valid, clean, and fully executable **TypeScript**.
2.  **Completeness**: Provide complete, runnable `.spec.ts` files. Do not provide snippets or partial code.
3.  **Comments**: Add JSDoc-style comments to explain complex actions or business logic within test methods.
4.  **Formatting**: Code should be well-formatted and readable.
5.  **Imports**: Ensure all necessary modules (`test`, `expect`, page objects, test data) are imported at the top of the file.
