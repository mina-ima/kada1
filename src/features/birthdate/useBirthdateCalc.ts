import { useState, useMemo } from 'react';
import { parseWareki } from '@/lib/date/parseWareki';
import { parseGregorian } from '@/lib/date/parseGregorian';
import { isFutureDate } from '@/lib/date/validate';
import { calculateAge } from '@/lib/date/age';
import { formatWareki } from '@/lib/date/formatWareki';

interface BirthdateCalcResult {
  gregorianBirthdate: Date | null;
  warekiBirthdate: string | null;
  age: number | null;
  error: string | null;
}

export const useBirthdateCalc = (birthdateString: string, referenceDateString: string) => {
  const result = useMemo<BirthdateCalcResult>(() => {
    let error: string | null = null;
    let gregorianBirthdate: Date | null = null;
    let warekiBirthdate: string | null = null;
    let age: number | null = null;

    // Try parsing as Gregorian first
    let parsedBirthdate = parseGregorian(birthdateString);

    // If not Gregorian, try parsing as Wareki
    if (!parsedBirthdate) {
      parsedBirthdate = parseWareki(birthdateString);
    }

    if (!parsedBirthdate) {
      error = '日付が正しくありません。形式を確認してください。'; // Invalid date format
    } else if (isFutureDate(parsedBirthdate)) {
      error = '未来の日付は指定できません。'; // Future date
    } else {
      gregorianBirthdate = parsedBirthdate;
      warekiBirthdate = formatWareki(parsedBirthdate);

      // Parse reference date
      let parsedReferenceDate: Date | null = null;
      if (referenceDateString) {
        parsedReferenceDate = parseGregorian(referenceDateString);
        if (!parsedReferenceDate) {
          parsedReferenceDate = parseWareki(referenceDateString);
        }
      }

      // If reference date is invalid or future, use today's date
      const finalReferenceDate = (parsedReferenceDate && !isFutureDate(parsedReferenceDate)) 
                                 ? parsedReferenceDate 
                                 : new Date();

      age = calculateAge(gregorianBirthdate, finalReferenceDate);
    }

    return {
      gregorianBirthdate,
      warekiBirthdate,
      age,
      error,
    };
  }, [birthdateString, referenceDateString]);

  return result;
};
