import { FullConfig } from '@playwright/test';
import { MyLogger } from './src/utils/logger';

async function globalTeardown(config: FullConfig) {
  const logger = MyLogger.getLogger();
  logger.info('------------------ GLOBAL TEARDOWN -----------------');
  // Add any cleanup logic here, e.g., shutting down a test server
  logger.info('Global teardown complete.');
  logger.info('----------------------------------------------------');
}

export default globalTeardown;
