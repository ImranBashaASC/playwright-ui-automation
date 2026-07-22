import { FullConfig } from '@playwright/test';
import { logger } from '@/utils/logger';
import { Env }from '@/utils/env.config';

async function globalSetup(config: FullConfig) {
  logger.info('----------------------------------------------------------------');
  logger.info('Starting Global Setup...');
  logger.info(`Executing tests in environment: ${Env.getEnv()}`);
  logger.info(`Base URL: ${Env.getBaseUrl()}`);
  logger.info('----------------------------------------------------------------');
  // Here you could add logic to:
  // 1. Log in a central user and save session state
  // 2. Seed a database
  // 3. Start a dependency service
}

export default globalSetup;
