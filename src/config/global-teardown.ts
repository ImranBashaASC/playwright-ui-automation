import { FullConfig } from '@playwright/test';
import { logger } from '@/utils/logger';

async function globalTeardown(config: FullConfig) {
  logger.info('----------------------------------------------------------------');
  logger.info('Executing Global Teardown...');
  logger.info('All tests have finished.');
  logger.info('----------------------------------------------------------------');
  // Here you could add logic to:
  // 1. Clean up any global resources
  // 2. Generate a summary report
  // 3. Notify a service that the test run is complete
}

export default globalTeardown;
