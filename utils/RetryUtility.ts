
import logger from './Logger';

export class RetryUtility {
  static async retry<T>(
    action: () => Promise<T>,
    maxRetries: number,
    delay: number
  ): Promise<T> {
    let lastError: any;
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await action();
      } catch (error) {
        lastError = error;
        logger.warn(`Attempt ${i + 1} failed. Retrying in ${delay}ms...`);
        await new Promise(res => setTimeout(res, delay));
      }
    }
    throw lastError;
  }
}
