
import { APIRequestContext } from '@playwright/test';

export class ApiUtility {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async get(endpoint: string, options?: any) {
    return this.request.get(endpoint, options);
  }

  async post(endpoint: string, data: any, options?: any) {
    return this.request.post(endpoint, { data, ...options });
  }
}
