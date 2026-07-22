import * as ExcelJS from 'exceljs';
import * as fs from 'fs';

/**
 * Utility for reading data from Excel files.
 */
export class ExcelUtil {

    /**
     * Reads data from an Excel sheet and returns it as an array of objects.
     * Assumes the first row is the header row.
     * @param {string} filePath - The path to the Excel file.
     * @param {string} sheetName - The name of the sheet to read.
     * @returns {Promise<any[]>}
     */
    static async readFromSheet(filePath: string, sheetName: string): Promise<any[]> {
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }

        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePath);
        const worksheet = workbook.getWorksheet(sheetName);

        if (!worksheet) {
            throw new Error(`Sheet '${sheetName}' not found in ${filePath}`);
        }

        const data: any[] = [];
        const headerRow = worksheet.getRow(1);
        if (!headerRow.values) return [];

        const headers = (headerRow.values as string[]).slice(1); // remove the empty first element

        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber > 1) { // Skip header row
                const rowObject: { [key: string]: any } = {};
                const rowValues = row.values as any[];
                headers.forEach((header, index) => {
                    rowObject[header] = rowValues[index + 1];
                });
                data.push(rowObject);
            }
        });

        return data;
    }
}
