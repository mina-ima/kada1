import { useMemo } from 'react';
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

const parseDateString = (dateString: string): Date | null => {
  if (!dateString) return null;
  let parsedDate = parseGregorian(dateString);
  if (!parsedDate) {
    parsedDate = parseWareki(dateString);
  }
  return parsedDate;
};

export const useBirthdateCalc = (
  birthDateString: string,
  referenceDateString: string
): BirthdateCalcResult => {

  const result = useMemo<BirthdateCalcResult>(() => {
    if (!birthDateString) {
      return { gregorianBirthdate: null, warekiBirthdate: null, age: null, error: null };
    }

    let error: string | null = null;
    let gregorianBirthdate: Date | null = null;
    let warekiBirthdate: string | null = null;
    let age: number | null = null;

    const parsedBirthdate = parseDateString(birthDateString);

    if (!parsedBirthdate) {
      error = '生年月日が正しくありません。形式を確認してください。';
    } else if (isFutureDate(parsedBirthdate)) {
      error = '生年月日に未来の日付は指定できません。';
    } else {
      gregorianBirthdate = parsedBirthdate;
      warekiBirthdate = formatWareki(parsedBirthdate);

      const parsedReferenceDate = parseDateString(referenceDateString);

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
  }, [birthDateString, referenceDateString]);

  return result;
};
