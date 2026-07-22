import * as fs from 'fs';
import * as path from 'path';
import * as Papa from 'papaparse';

/**
 * Utility for file system operations.
 */
export class FileUtil {

    /**
     * Reads a text file.
     * @param {string} filePath - The path to the file.
     * @returns {string} The content of the file.
     */
    static readFile(filePath: string): string {
        return fs.readFileSync(filePath, 'utf-8');
    }

    /**
     * Writes content to a file.
     * @param {string} filePath - The path to the file.
     * @param {string} content - The content to write.
     */
    static writeFile(filePath: string, content: string): void {
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(filePath, content);
    }

    /**
     * Reads data from a CSV file.
     * @param {string} filePath - The path to the CSV file.
     * @returns {Promise<any[]>} A promise that resolves to an array of objects.
     */
    static async readCsv(filePath: string): Promise<any[]> {
        const csvFile = fs.readFileSync(filePath, 'utf-8');
        return new Promise(resolve => {
            Papa.parse(csvFile, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    resolve(results.data);
                },
            });
        });
    }
}
