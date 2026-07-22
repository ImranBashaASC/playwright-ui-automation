import { FullConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import logger from './utils/Logger';
import { AuthHelper } from './helpers/auth.helper';
import { chromium } from '@playwright/test';

async function globalSetup(config: FullConfig) {
    logger.info('--- Global Setup Started ---');

    // Load environment variables
    if (process.env.ENV) {
        dotenv.config({
            path: path.resolve(__dirname, `config/.env.${process.env.ENV}`),
            override: true
        });
    } else {
        dotenv.config({
            path: path.resolve(__dirname, '.env'),
            override: true
        });
    }
    logger.info(`Environment set to: ${process.env.ENV || 'default'}`);
    logger.info(`Base URL: ${process.env.BASE_URL}`);

    // Example: Pre-authenticate a user and save the state
    // This is useful if many tests require a logged-in user, saving time on login for each test suite.
    const authFile = 'playwright/.auth/user.json';
    const browser = await chromium.launch();
    const page = await browser.newPage();
    const authHelper = new AuthHelper(page);

    try {
        logger.info('Attempting to pre-authenticate user...');
        await authHelper.loginAndSaveSession(
            process.env.USER_EMAIL!,
            process.env.USER_PASSWORD!,
            authFile
        );
        logger.info('User authenticated and session saved.');
    } catch (error) {
        logger.error('Global setup authentication failed:', error);
    } finally {
        await browser.close();
    }


    logger.info('--- Global Setup Finished ---');
}

export default globalSetup;
