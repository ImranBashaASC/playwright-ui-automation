import { FullConfig } from '@playwright/test';
import logger from './utils/Logger';

async function globalTeardown(config: FullConfig) {
    logger.info('--- Global Teardown Started ---');

    // Add any cleanup logic here.
    // For example, cleaning up test data from a database,
    // or posting a summary to a Slack channel.

    logger.info('Test run finished. All suites have completed.');

    logger.info('--- Global Teardown Finished ---');
}

export default globalTeardown;
