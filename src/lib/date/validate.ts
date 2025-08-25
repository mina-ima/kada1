/**
 * Checks if a given date is a future date compared to today.
 * @param date The Date object to check.
 * @returns True if the date is in the future, false otherwise.
 */
export function isFutureDate(date: Date): boolean {
  const today = new Date();
  // Set hours, minutes, seconds, milliseconds to 0 for accurate day comparison
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);

  return date > today;
}
