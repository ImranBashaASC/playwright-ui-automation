import * as fs from 'fs';
import * as path from 'path';
import * as Papa from 'papaparse';
import * as exceljs from 'exceljs';

export class DataUtils {
  
  static getJsonData(filePath: string): any {
    const absolutePath = path.resolve(__dirname, `../../data/${filePath}`);
    const rawData = fs.readFileSync(absolutePath, 'utf-8');
    return JSON.parse(rawData);
  }

  static async getCsvData(filePath: string): Promise<any[]> {
    const absolutePath = path.resolve(__dirname, `../../data/${filePath}`);
    const csvFile = fs.readFileSync(absolutePath, 'utf-8');
    return new Promise((resolve) => {
      Papa.parse(csvFile, {
        header: true,
        complete: (results) => {
          resolve(results.data);
        },
      });
    });
  }

  static async getExcelData(filePath: string, sheetName: string): Promise<any[]> {
    const absolutePath = path.resolve(__dirname, `../../data/${filePath}`);
    const workbook = new exceljs.Workbook();
    await workbook.xlsx.readFile(absolutePath);
    const worksheet = workbook.getWorksheet(sheetName);
    const data: any[] = [];
    const header = worksheet.getRow(1).values as string[];
    
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) {
        const rowData: { [key: string]: any } = {};
        row.eachCell((cell, colNumber) => {
          rowData[header[colNumber]] = cell.value;
        });
        data.push(rowData);
      }
    });
    return data;
  }
}
