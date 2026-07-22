/**
 * Utility class for date and time operations.
 */
export class DateUtil {

    /**
     * Gets the current date in YYYY-MM-DD format.
     * @returns {string}
     */
    static getCurrentDate(): string {
        return new Date().toISOString().slice(0, 10);
    }

    /**
     * Gets the current date and time as a timestamp string for file naming.
     * @returns {string} e.g., '20231027_143055'
     */
    static getTimestamp(): string {
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        return `${year}${month}${day}_${hours}${minutes}${seconds}`;
    }

    /**
     * Adds a specified number of days to the current date.
     * @param {number} days - The number of days to add.
     * @returns {Date}
     */
    static addDays(days: number): Date {
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + days);
        return futureDate;
    }
}
