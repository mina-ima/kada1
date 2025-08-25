import { eras } from './eras';

/**
 * Parses a Wareki (Japanese era) string into a Gregorian Date object.
 * Handles S/H/R abbreviations, Gannen (元年), and various separators.
 * @param warekiString The Wareki string to parse (e.g., "R1/5/1", "H31-4-30", "S45.12.3").
 * @returns A Date object if parsing is successful, otherwise null.
 */
export function parseWareki(warekiString: string): Date | null {
  // Normalize separators and handle zero-padding
  const normalizedString = warekiString.replace(/[-\.\s]/g, '/');

  // Regex to match Wareki patterns (e.g., R1/5/1, H31/4/30, S45/12/3)
  const warekiRegex = /^(S|H|R)(\d{1,2}|元)\/(\d{1,2})\/(\d{1,2})$/i;
  const match = normalizedString.match(warekiRegex);

  if (!match) {
    return null; // Invalid format
  }

  const [, eraAbbr, yearStr, monthStr, dayStr] = match;

  const era = eras.find(e => e.abbr.toLowerCase() === eraAbbr.toLowerCase());
  if (!era) {
    return null; // Era not found
  }

  let year = parseInt(yearStr, 10);
  if (yearStr.toLowerCase() === '元') {
    year = 1; // Gannen
  }

  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);

  let gregorianYear: number;
  let date: Date;

  if (year === 1) {
    // For Gannen (year 1), the Gregorian year is the same as the era's start year.
    // The month and day are taken directly from the input.
    gregorianYear = era.start.getFullYear();
    date = new Date(gregorianYear, month - 1, day);
  } else {
    // For subsequent years, calculate the Gregorian year relative to the era's start year.
    gregorianYear = era.start.getFullYear() + year - 1;
    date = new Date(gregorianYear, month - 1, day);
  }

  // Basic validation: Check if the date is valid (e.g., Feb 30 becomes Mar 1) and falls within the era's range
  if (date.getFullYear() !== gregorianYear || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return null; // Invalid date (e.g., Feb 30)
  }

  // Check if the date falls within the era's defined start and end dates
  if (date < era.start || (era.end && date > era.end)) {
    return null; // Date outside era range
  }

  return date;
}
