import { APIRequestContext } from '@playwright/test';

/**
 * A wrapper class for making API requests.
 * This can be used for setting up test data, or for API-level tests.
 */
export class ApiService {
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

    async put(endpoint: string, data: any, options?: any) {
        return this.request.put(endpoint, { data, ...options });
    }

    async delete(endpoint: string, options?: any) {
        return this.request.delete(endpoint, options);
    }

    /**
     * Example: Authenticate via API and get a token.
     * @param {string} authUrl - The authentication endpoint.
     * @param {any} credentials - The user credentials.
     * @returns {Promise<string>} The authentication token.
     */
    async getAuthToken(authUrl: string, credentials: any): Promise<string> {
        const response = await this.post(authUrl, credentials);
        const responseBody = await response.json();
        // Adjust this based on the actual API response structure
        return responseBody.token;
    }
}
