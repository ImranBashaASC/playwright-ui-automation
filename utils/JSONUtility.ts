
export class JSONUtility {
  static parse(jsonString: string): any {
    return JSON.parse(jsonString);
  }

  static stringify(jsonObject: any): string {
    return JSON.stringify(jsonObject, null, 2);
  }
}
