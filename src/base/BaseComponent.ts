
import { Page } from '@playwright/test';
import { MyLogger } from '../utils/logger';
import * as winston from 'winston';

export class BaseComponent {
  readonly page: Page;
  protected logger: winston.Logger;

  constructor(page: Page) {
    this.page = page;
    this.logger = MyLogger.getLogger(this.constructor.name);
  }
}
