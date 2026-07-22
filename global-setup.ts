
import { chromium, FullConfig } from '@playwright/test';
import { AuthHelper } from './helpers/authHelper';
import logger from './utils/Logger';

async function globalSetup(config: FullConfig) {
  logger.info('--- Starting Global Setup ---');
  const { baseURL, storageState } = config.projects[0].use;
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    logger.info(`Performing authentication for user: ${process.env.ADMIN_USERNAME}`);
    await page.goto(baseURL + '/login');
    const authHelper = new AuthHelper(page);
    await authHelper.login(
      process.env.ADMIN_USERNAME!,
      process.env.ADMIN_PASSWORD!
    );
    await page.context().storageState({ path: storageState as string });
    logger.info('Authentication successful. State saved.');
  } catch (error) {
    logger.error('Global setup failed during authentication:', error);
    // Decide if the test run should continue or not.
    // For this template, we'll throw the error to stop the run.
    throw error;
  } finally {
    await browser.close();
    logger.info('--- Global Setup Finished ---');
  }
}

export default globalSetup;
