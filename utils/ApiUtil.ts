import { APIRequestContext, request } from '@playwright/test';

/**
 * A utility for creating API request contexts.
 */
export class ApiUtil {
    private static instance: APIRequestContext;

    /**
     * Gets a singleton instance of the APIRequestContext.
     * @param {string} [baseURL] - The base URL for the API.
     * @returns {Promise<APIRequestContext>}
     */
    public static async getApiContext(baseURL?: string): Promise<APIRequestContext> {
        if (!ApiUtil.instance) {
            ApiUtil.instance = await request.newContext({
                baseURL: baseURL || process.env.API_URL,
                // Add any other headers or settings needed for your API
                extraHTTPHeaders: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${process.env.API_TOKEN}`
                },
            });
        }
        return ApiUtil.instance;
    }
}
