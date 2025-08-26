/**
 * Calculates the service duration between a start date and an end date.
 * Returns the duration in years, months, and days.
 * @param startDate The start date (e.g., employment date).
 * @param endDate The end date (e.g., reference date).
 * @returns An object containing years, months, and days.
 */
export function calculateServiceYears(startDate: Date, endDate: Date): { years: number; months: number; days: number } {
  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();
  let days = endDate.getDate() - startDate.getDate();

  if (days < 0) {
    months--;
    const daysInPrevMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).getDate();
    days = (daysInPrevMonth - startDate.getDate()) + endDate.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}
