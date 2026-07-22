
export class DateUtility {
  static getCurrentDate(format: string = 'YYYY-MM-DD'): string {
    // Basic implementation. For more complex formatting, consider a library like date-fns or moment.
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return format
      .replace('YYYY', String(year))
      .replace('MM', month)
      .replace('DD', day);
  }
}
