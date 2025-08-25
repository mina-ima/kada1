import { eras } from './eras';

/**
 * Formats a Gregorian Date object into a full Kanji Wareki string, including Gannen (元年) notation.
 * @param date The Gregorian Date object to format.
 * @returns A string representing the date in Wareki format (e.g., "令和元年5月1日"), or null if the date is outside defined eras.
 */
export function formatWareki(date: Date): string | null {
  // Find the corresponding era for the given date
  const era = eras.find(e => {
    const eraStart = new Date(e.start.getFullYear(), e.start.getMonth(), e.start.getDate());
    const eraEnd = e.end ? new Date(e.end.getFullYear(), e.end.getMonth(), e.end.getDate()) : null;

    return date >= eraStart && (!eraEnd || date <= eraEnd);
  });

  if (!era) {
    return null; // Date is outside defined eras
  }

  // Calculate the year within the era
  const yearInEra = date.getFullYear() - era.start.getFullYear() + 1;

  // Format year with Gannen (元年) if it's the first year of the era
  const yearString = yearInEra === 1 ? '元年' : `${yearInEra}年`;

  // Get month and day
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${era.name}${yearString}${month}月${day}日`;
}
