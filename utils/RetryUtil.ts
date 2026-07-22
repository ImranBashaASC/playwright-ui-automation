import logger from './Logger';

/**
 * A utility for retrying an async operation.
 */
export class RetryUtil {

    /**
     * Retries an async function a specified number of times.
     * @param {() => Promise<T>} fn - The async function to retry.
     * @param {number} retries - The number of retries.
     * @param {number} delay - The delay between retries in ms.
     * @returns {Promise<T>} The result of the function if it succeeds.
     * @template T
     */
    static async retry<T>(fn: () => Promise<T>, retries: number, delay: number): Promise<T> {
        let lastError: Error | undefined;
        for (let i = 0; i < retries; i++) {
            try {
                return await fn();
            } catch (error: any) {
                lastError = error;
                logger.warn(`Attempt ${i + 1} failed. Retrying in ${delay}ms...`);
                await new Promise(res => setTimeout(res, delay));
            }
        }
        logger.error(`All ${retries} retry attempts failed.`);
        throw lastError;
    }
}
