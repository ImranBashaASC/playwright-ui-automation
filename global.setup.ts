import { FullConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { MyLogger } from './src/utils/logger';

async function globalSetup(config: FullConfig) {
  const logger = MyLogger.getLogger();
  logger.info('------------------- GLOBAL SETUP -------------------');
  
  // Load environment variables
  if (process.env.test_env) {
    dotenv.config({
      path: path.resolve(__dirname, `config/.env.${process.env.test_env}`),
      override: true
    });
    logger.info(`Loading environment variables for: ${process.env.test_env}`);
  } else {
    dotenv.config({
      path: path.resolve(__dirname, '.env'),
      override: true
    });
    logger.info('Loading default environment variables from .env');
  }

  // Example: Perform a global login and save session state
  // This part is commented out but shows how you could do it.
  /*
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const authFile = 'playwright/.auth/user.json';

  try {
    await page.goto(process.env.BASE_URL + '/login');
    await page.fill('input[name="username"]', process.env.ADMIN_USERNAME!);
    await page.fill('input[name="password"]', process.env.ADMIN_PASSWORD!);
    await page.click('button[type="submit"]');
    await page.waitForURL('**/dashboard**');
    
    await page.context().storageState({ path: authFile });
    logger.info('Global setup: Successfully logged in and saved storage state.');
    await browser.close();
  } catch (error) {
    logger.error('Global setup failed:', error);
    await browser.close();
    throw error;
  }
  */
 logger.info('----------------------------------------------------');
}

export default globalSetup;
