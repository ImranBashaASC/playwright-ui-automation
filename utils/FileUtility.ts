
import fs from 'fs';

export class FileUtility {
  static readFile(filePath: string): string {
    return fs.readFileSync(filePath, 'utf-8');
  }

  static writeFile(filePath: string, content: string): void {
    fs.writeFileSync(filePath, content);
  }
}
