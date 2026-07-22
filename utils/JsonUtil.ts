import { FileUtil } from './FileUtil';

/**
 * Utility for working with JSON files.
 */
export class JsonUtil {

    /**
     * Reads and parses a JSON file.
     * @param {string} filePath - The path to the JSON file.
     * @returns {any} The parsed JSON object.
     */
    static readJsonFile(filePath: string): any {
        const fileContent = FileUtil.readFile(filePath);
        return JSON.parse(fileContent);
    }

    /**
     * Writes a JavaScript object to a JSON file.
     * @param {string} filePath - The path to the JSON file.
     * @param {any} data - The object to write.
     */
    static writeJsonFile(filePath: string, data: any): void {
        const jsonString = JSON.stringify(data, null, 2); // Pretty print
        FileUtil.writeFile(filePath, jsonString);
    }
}
