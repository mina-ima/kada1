/**
 * Parses a Gregorian date string into a Date object.
 * Accepts yyyy/m/d, yyyy-m-d, yyyy.m.d, and yyyy m d formats.
 * Performs real date validation (e.g., checks for valid month/day combinations, leap years).
 * @param gregorianString The Gregorian date string to parse (e.g., "1990/1/1", "2023-02-29").
 * @returns A Date object if parsing and validation are successful, otherwise null.
 */
export function parseGregorian(gregorianString: string): Date | null {
  // Normalize separators to '/'
  const normalizedString = gregorianString.replace(/[-\.\s]/g, '/');

  // Regex to match yyyy/m/d pattern
  const gregorianRegex = /^(\d{4})\/(\d{1,2})\/(\d{1,2})$/;
  const match = normalizedString.match(gregorianRegex);

  if (!match) {
    return null; // Invalid format
  }

  const [, yearStr, monthStr, dayStr] = match;

  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);

  // Basic range check for month and day
  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return null;
  }

  const date = new Date(year, month - 1, day);

  // Validate if the constructed date matches the input date (handles invalid dates like Feb 30, or month/day rollovers)
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return null; // Invalid date (e.g., Feb 30, or month/day rollover)
  }

  return date;
}
