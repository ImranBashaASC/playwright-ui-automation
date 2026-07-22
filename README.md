
# Playwright UI Automation Framework

This is an enterprise-grade, scalable, and modular UI automation framework using Playwright and TypeScript. It's designed to be AI-ready and follows industry best practices for building robust and maintainable automated tests.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Execution](#execution)
- [Reporting](#reporting)
- [CI/CD](#cicd)
- [Docker](#docker)
- [Best Practices](#best-practices)
- [AI-Ready Architecture](#ai-ready-architecture)

## Features

- **Cross-Browser Support**: Run tests on Chromium, Firefox, and WebKit.
- **Parallel Execution**: Speed up test runs by executing tests in parallel.
- **Page Object Model (POM)**: Maintainable and reusable UI tests.
- **Component Object Model**: Reusable components for common UI elements.
- **Custom Fixtures**: Simplified test setup for different user roles and states.
- **Self-Healing Locators**: Fallback mechanism for more stable locators.
- **Smart Waits**: No fixed waits, leveraging Playwright's auto-waiting capabilities.
- **Comprehensive Reporting**: HTML, Allure, JUnit, and JSON reports.
- **CI/CD Integration**: Ready-to-use pipelines for GitHub Actions and Azure DevOps.
- **Dockerized**: Run tests in a containerized environment for consistency.
- **Code Quality**: Enforced with ESLint and Prettier.
- **Advanced Features**: Visual testing, accessibility testing, network mocking, and more.
- **AI-Ready**: Designed with interfaces for future integration of AI-powered testing agents.

## Tech Stack

- **Automation Tool**: Playwright
- **Language**: TypeScript
- **Package Manager**: npm
- **Node Version**: Latest LTS
- **Framework Pattern**: Page Object Model (POM), Component Object Model, Fixture-Based Design
- **Architecture**: Modular, SOLID, DRY, KISS

## Folder Structure

```
playwright-ui-automation/
├── .github/workflows/        # GitHub Actions CI/CD pipeline
├── ai/                       # AI agent interfaces and placeholders
├── config/                   # Environment-specific configurations
├── components/               # Reusable UI component objects
├── constants/                # Application constants
├── data/                     # Test data files (JSON, CSV)
├── fixtures/                 # Custom Playwright fixtures
├── helpers/                  # Helper functions (auth, storage, etc.)
├── locators/                 # Locator management and self-healing
├── pages/                    # Page Object Model classes
├── reports/                  # Test execution reports
├── screenshots/              # Screenshots captured during test runs
├── services/                 # API service clients
├── tests/                    # Test suites (specs)
├── traces/                   # Playwright trace files
├── utils/                    # Reusable utility functions
├── videos/                   # Video recordings of test runs
├── .dockerignore             # Docker ignore file
├── .eslintrc.js              # ESLint configuration
├── .gitignore                # Git ignore file
- .prettierrc               # Prettier configuration
├── azure-pipelines.yml       # Azure DevOps CI/CD pipeline
├── docker-compose.yml        # Docker Compose configuration
├── Dockerfile                # Dockerfile for containerizing the framework
├── global-setup.ts           # Global setup for authentication
├── global-teardown.ts        # Global teardown
├── package.json              # Project dependencies and scripts
├── playwright.config.ts      # Main Playwright configuration
├── README.md                 # This file
└── tsconfig.json             # TypeScript compiler options
```

## Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd playwright-ui-automation
    ```

2.  **Install Node.js and npm:**
    Ensure you have the latest LTS version of Node.js installed.

3.  **Install project dependencies:**
    ```bash
    npm install
    ```

4.  **Install Playwright browsers:**
    ```bash
    npx playwright install
    ```

## Environment Setup

The framework supports different environments (e.g., QA, DEV, UAT). Environment variables are managed using `.env` files.

1.  Create a `.env` file in the root directory (e.g., `.env.qa`, `.env.dev`).
2.  Add environment-specific variables:
    ```
    BASE_URL=https://your-qa-app.com
    ADMIN_USERNAME=admin
    ADMIN_PASSWORD=secret
    ```
3.  The framework will automatically load the correct `.env` file based on the `test_env` variable passed to the test command. See the `execution` section.

The base URL and other configurations are managed in `playwright.config.ts`.

## Execution

Run tests using the npm scripts defined in `package.json`.

### Run all tests

```bash
# Headless mode (default)
npm test

# Headed mode
npm run test:headed
```

### Run tests for a specific environment

```bash
# Run tests on the QA environment
npm run test:qa

# Run tests on the DEV environment
npm run test:dev
```

### Run specific test suites (Tags)

Use tags like `@Smoke`, `@Regression`, `@Sanity`.

```bash
# Run Smoke tests
npm run test:smoke

# Run Regression tests
npm run test:regression
```

### Run a single test file

```bash
npx playwright test tests/login.spec.ts
```

### Run tests in parallel (default)

Parallel execution is enabled by default in `playwright.config.ts`.

### Available npm commands

- `npm test`: Runs all tests in headless mode.
- `npm run test:headed`: Runs all tests in headed mode.
- `npm run test:parallel`: Runs all tests in parallel.
- `npm run test:single`: Runs a single test file.
- `npm run test:smoke`: Runs tests with the `@Smoke` tag.
- `npm run test:regression`: Runs tests with the `@Regression` tag.
- `npm run test:sanity`: Runs tests with the `@Sanity` tag.
- `npm run test:qa`: Runs tests on the QA environment.
- `npm run test:dev`: Runs tests on the DEV environment.
- `npm run test:uat`: Runs tests on the UAT environment.
- `npm run report:show`: Opens the last HTML report.
- `npm run report:allure`: Generates and opens the Allure report.

## Reporting

This framework is configured to generate multiple reports.

- **HTML Report**: A rich, interactive report generated by Playwright.
  - `npm run report:show`
- **Allure Report**: A detailed, feature-rich report.
  - `npm run report:allure`
- **JUnit XML**: For integration with CI/CD systems.
- **JSON Report**: Raw JSON output of the test results.

Reports are saved in the `reports/` directory.

## CI/CD

### GitHub Actions

A complete CI/CD workflow is defined in `.github/workflows/ci.yml`. The pipeline will:
1.  Install dependencies.
2.  Build the project.
3.  Run all tests.
4.  Generate reports.
5.  Publish test artifacts (reports, screenshots, videos).

### Azure DevOps

An Azure DevOps pipeline is defined in `azure-pipelines.yml`. It performs similar steps to the GitHub Actions workflow and publishes results to Azure Test Plans.

## Docker

Run your tests inside a Docker container for a consistent and isolated environment.

1.  **Build the Docker image:**
    ```bash
    docker-compose build
    ```

2.  **Run the tests:**
    ```bash
    docker-compose run --rm playwright
    ```

This command mounts the local directory into the container, so reports and other artifacts will be available on your host machine.

## Best Practices

- **SOLID, DRY, KISS**: The framework is designed with these principles in mind.
- **Modular Design**: Keep code organized and decoupled.
- **Reusable Components**: Create components for common UI elements.
- **No Hardcoded Waits**: Use Playwright's auto-waiting and `expect` assertions.
- **Configuration over Code**: Use `playwright.config.ts` and `.env` files for configuration.
- **Meaningful Test Descriptions**: Write clear and concise test names.
- **Use of Fixtures**: Abstract away setup and teardown logic.
- **Atomic Tests**: Each test should be independent and self-contained.

## AI-Ready Architecture

The `ai/` directory contains interfaces for various AI agents. This design allows for the future integration of Large Language Models (LLMs) or other AI services to enhance testing capabilities without requiring a major architectural refactor.

- **`LocatorHealingAgent`**: To dynamically find elements when primary locators fail.
- **`VisionAgent`**: For visual testing using AI.
- **`FailureAnalysisAgent`**: To analyze failures and suggest root causes.
- **`TestGenerationAgent`**: To automatically generate new test cases.
- ...and more.

By programming against these interfaces, you can easily swap in different AI model implementations as they become available.
