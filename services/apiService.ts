
import { APIRequestContext, APIResponse } from '@playwright/test';
import logger from '../utils/Logger';

export class ApiService {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async get(endpoint: string, headers?: { [key: string]: string }): Promise<APIResponse> {
    logger.info(`Sending GET request to: ${endpoint}`);
    return this.request.get(endpoint, { headers });
  }

  async post(endpoint: string, data: any, headers?: { [key: string]: string }): Promise<APIResponse> {
    logger.info(`Sending POST request to: ${endpoint}`);
    return this.request.post(endpoint, { data, headers });
  }

  async put(endpoint: string, data: any, headers?: { [key: string]: string }): Promise<APIResponse> {
    logger.info(`Sending PUT request to: ${endpoint}`);
    return this.request.put(endpoint, { data, headers });
  }

  async delete(endpoint: string, headers?: { [key: string]: string }): Promise<APIResponse> {
    logger.info(`Sending DELETE request to: ${endpoint}`);
    return this.request.delete(endpoint, { headers });
  }
}
