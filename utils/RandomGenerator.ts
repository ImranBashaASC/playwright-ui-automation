/**
 * Utility class for generating random data.
 */
export class RandomGenerator {

    /**
     * Generates a random string of a given length.
     * @param {number} length - The desired length of the string.
     * @returns {string}
     */
    static randomString(length: number): string {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    /**
     * Generates a random email address.
     * @param {string} [domain='example.com'] - The domain for the email.
     * @returns {string}
     */
    static randomEmail(domain: string = 'example.com'): string {
        return `${this.randomString(10)}@${domain}`;
    }

    /**
     * Generates a random number within a specified range.
     * @param {number} min - The minimum value (inclusive).
     * @param {number} max - The maximum value (inclusive).
     * @returns {number}
     */
    static randomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
