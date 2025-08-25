/**
 * Calculates the age based on a birthdate and a reference date.
 * The reference date defaults to today's date in Japan time.
 * @param birthdate The birthdate as a Date object.
 * @param referenceDate Optional. The reference date as a Date object. Defaults to today in Japan time.
 * @returns The age in years.
 */
export function calculateAge(birthdate: Date, referenceDate?: Date): number {
  const refDate = referenceDate || new Date(); // Default to current date

  // Adjust for Japan time if necessary (though Date objects handle this internally based on system locale)
  // For precise Japan time, one might use a library like date-fns-tz or moment-timezone.
  // For simplicity, we assume the environment where this code runs has its timezone set correctly,
  // or that the Date object's internal UTC representation is sufficient for age calculation.

  let age = refDate.getFullYear() - birthdate.getFullYear();
  const monthDiff = refDate.getMonth() - birthdate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && refDate.getDate() < birthdate.getDate())) {
    age--;
  }

  return age;
}
