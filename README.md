# Enterprise Grade Playwright UI Automation Framework

This is a production-ready, enterprise-grade UI automation framework using Playwright and TypeScript. It's designed to be scalable, modular, reusable, and AI-ready, following industry best practices.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Execution](#execution)
- [Reporting](#reporting)
- [CI/CD Integration](#cicd-integration)
- [Docker Setup](#docker-setup)
- [Code Quality](#code-quality)
- [AI-Ready Architecture](#ai-ready-architecture)
- [Best Practices](#best-practices)

## Features

- **Cross-Browser Support**: Chromium, Firefox, WebKit.
- **Parallel Execution**: Run tests in parallel for speed.
- **POM & Component Object Model**: For reusable and maintainable UI interactions.
- **Custom Fixtures**: Simplified test setup for different user roles and states.
- **Multiple Reporters**: HTML, Allure, JUnit, JSON.
- **CI/CD Ready**: GitHub Actions and Azure DevOps pipelines included.
- **Dockerized**: Run tests in a containerized environment.
- **Advanced Logging**: Detailed logs using Winston.
- **Data-Driven**: Support for JSON, CSV, and environment variables.
- **Self-Healing Locators**: Fallback locator strategy.
- **AI-Ready**: Modular interfaces for future AI integration.
- **Comprehensive Utilities**: Helpers for API, dates, files, and more.
- **Advanced Features**: Visual testing, accessibility, network mocking, session management.

## Tech Stack

- **Automation Tool**: Playwright
- **Language**: TypeScript
- **Package Manager**: npm
- **Node Version**: 18.x or higher
- **Framework Pattern**: Page Object Model (POM), Component Object Model, Fixture-Based Design
- **Architecture**: Modular, SOLID, DRY, KISS

## Folder Structure

```
.
├── .github/workflows/      # GitHub Actions CI/CD pipeline
├── ai/                     # AI agent interfaces and placeholders
├── config/                 # Environment-specific configurations (qa, uat, prod)
├── data/                   # Test data files (JSON, CSV)
├── fixtures/               # Custom Playwright fixtures
├── helpers/                # High-level helper classes (Authentication, API)
├── locators/               # Centralized locator management
├── pages/                  # Page Object Model classes
├── components/             # Reusable UI component classes
├── reports/                # Generated test reports (HTML, Allure)
├── screenshots/            # Screenshots captured on failure/success
├── services/               # API service layer abstractions
├── src/                    # Source code for base classes and core logic
├── tests/                  # Test scripts (specs)
├── utils/                  # Low-level utility functions
├── .dockerignore
├── .eslintrc.js
├── .gitignore
├── .prettierrc
├── Dockerfile
├── docker-compose.yml
├── azure-pipelines.yml
├── global.setup.ts
├── global.teardown.ts
├── package.json
├── playwright.config.ts
├── README.md
└── tsconfig.json
```

## Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd playwright-ui-automation
    ```

2.  **Install Node.js:**
    Ensure you have Node.js (LTS version 18.x or higher) installed.

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Install Playwright browsers:**
    This command downloads the browser binaries for Chromium, Firefox, and WebKit.
    ```bash
    npx playwright install --with-deps
    ```

## Environment Setup

The framework supports different environments (e.g., `qa`, `dev`, `uat`, `prod`).

1.  Create a `.env` file in the root directory.
2.  Define environment-specific variables. You can use `.env.template` as a reference.

    ```env
    # .env file
    BASE_URL=https://your-qa-app.com
    ADMIN_USERNAME=admin
    ADMIN_PASSWORD=password123
    ```

The `playwright.config.ts` is configured to load these variables using `dotenv`.

## Execution

The `package.json` file contains various scripts to run tests.

### Running All Tests

```bash
# Run all tests in headless mode (default)
npm test

# Run all tests in headed mode
npm run test:headed
```

### Running Tagged Tests

Tests can be tagged with `@` in the test description (e.g., `test('@Smoke ...')`).

```bash
# Run Smoke tests
npm run test:smoke

# Run Regression tests
npm run test:regression
```

### Running a Single Test File

```bash
npx playwright test tests/login.spec.ts
```

### Running in Parallel

Parallel execution is enabled by default in `playwright.config.ts`.

```bash
# Run tests on a specific browser
npx playwright test --project=chromium
```

### Available npm Commands

- `npm test`: Runs all tests headlessly.
- `npm run test:headed`: Runs all tests in headed mode.
- `npm run test:parallel`: Runs all tests in parallel (default behavior).
- `npm run test:smoke`: Runs only tests tagged with `@Smoke`.
- `npm run test:regression`: Runs only tests tagged with `@Regression`.
- `npm run test:sanity`: Runs only tests tagged with `@Sanity`.
- `npm run test:qa`: Runs tests against the QA environment.
- `npm run test:dev`: Runs tests against the DEV environment.
- `npm run test:uat`: Runs tests against the UAT environment.
- `npm run report:show`: Opens the last HTML report.
- `npm run report:allure`: Generates and opens the Allure report.

## Reporting

This framework is configured to generate multiple reports.

- **HTML Reporter**: A self-contained HTML report. Opens automatically if `open: 'on-failure'` is set. Find it in the `playwright-report` directory.
- **Allure Reporter**: For rich, interactive reports.
  - After running tests, generate the report: `npm run report:allure`
  - Results are stored in `allure-results` and the report is generated in `allure-report`.
- **JUnit Reporter**: Generates `results.xml`, which is useful for CI/CD integration.
- **JSON Reporter**: Generates `results.json` with detailed test execution data.

## CI/CD Integration

### GitHub Actions

A complete workflow is defined in `.github/workflows/ci.yml`. It triggers on push/pull requests to the `main` branch and performs the following steps:
1.  Installs dependencies.
2.  Installs Playwright browsers.
3.  Runs tests.
4.  Uploads the Playwright HTML report and Allure results as artifacts.

### Azure DevOps

An `azure-pipelines.yml` file is provided for integration with Azure DevOps. It includes steps for installing dependencies, running tests, and publishing test results and reports.

## Docker Setup

Run your tests inside a Docker container to ensure a consistent environment.

### Prerequisites

- Docker installed and running.

### Building the Docker Image

```bash
docker build -t playwright-automation .
```

### Running Tests with Docker

```bash
docker run --rm --ipc=host -v $(pwd)/test-results:/app/test-results playwright-automation
```

### Using Docker Compose

The `docker-compose.yml` file simplifies the process.

```bash
docker-compose up --build
```
This command will build the image (if it doesn't exist) and run the tests. Test reports will be available in the `playwright-report` and `allure-results` directories on your local machine.

## Code Quality

- **ESLint**: For static code analysis. Run `npm run lint` to check for issues.
- **Prettier**: For consistent code formatting. Run `npm run format` to format all files.
- **TypeScript**: Strict type checking is enabled in `tsconfig.json`.

## AI-Ready Architecture

The `ai/` directory contains interfaces for various AI agents. This design allows for the future integration of Large Language Models (LLMs) to enhance the framework with capabilities like:
- **Self-healing locators**
- **Automated failure analysis**
- **Smart test generation**
- **Report summarization**

By building against these interfaces, the core framework remains decoupled from the specific AI implementation.

## Best Practices

- **Use Fixtures**: Abstract login and setup logic into fixtures for cleaner tests.
- **Use Page and Component Objects**: Keep your tests clean and readable by abstracting page logic.
- **Use `expect` for Waits**: Rely on Playwright's auto-waiting mechanism with `expect(locator).toBeVisible()` instead of fixed waits.
- **Centralize Locators**: Use the `locators` directory to manage and reuse selectors.
- **Tag Your Tests**: Use tags like `@Smoke`, `@Regression` to create different test suites.
- **Keep Tests Independent**: Each test should be able to run on its own without depending on others.
