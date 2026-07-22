import { APIRequestContext, request } from '@playwright/test';
import { MyLogger } from './logger';

export class ApiUtils {
  private apiContext: APIRequestContext | null = null;
  private logger = MyLogger.getLogger('ApiUtils');

  async getApiContext(): Promise<APIRequestContext> {
    if (!this.apiContext) {
      this.logger.info('Creating new API context');
      this.apiContext = await request.newContext({
        baseURL: process.env.API_BASE_URL,
        extraHTTPHeaders: {
          'Content-Type': 'application/json',
        },
      });
    }
    return this.apiContext;
  }

  async get(endpoint: string, params?: { [key: string]: any }): Promise<any> {
    const context = await this.getApiContext();
    this.logger.info(`Sending GET request to ${endpoint}`);
    const response = await context.get(endpoint, { params });
    const responseBody = await response.json();
    this.logger.info(`GET ${endpoint} returned status ${response.status()}`);
    return { status: response.status(), body: responseBody };
  }

  async post(endpoint: string, data: { [key: string]: any }): Promise<any> {
    const context = await this.getApiContext();
    this.logger.info(`Sending POST request to ${endpoint}`);
    const response = await context.post(endpoint, { data });
    const responseBody = await response.json();
    this.logger.info(`POST ${endpoint} returned status ${response.status()}`);
    return { status: response.status(), body: responseBody };
  }

  async dispose(): Promise<void> {
    if (this.apiContext) {
      await this.apiContext.dispose();
      this.apiContext = null;
      this.logger.info('API context disposed');
    }
  }
}
