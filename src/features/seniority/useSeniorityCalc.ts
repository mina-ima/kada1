import { useMemo } from 'react';
import { parseWareki } from '../../lib/date/parseWareki';
import { parseGregorian } from '../../lib/date/parseGregorian';
import { isFutureDate } from '../../lib/date/validate';
import { diffYMD, toFullYears } from '../../lib/date/seniority';
import type { Seniority } from '../../types';


interface SeniorityCalcResult {
  seniority: Seniority | null;
  fullYears: number | null;
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

export const useSeniorityCalc = (
  hireDateString: string,
  referenceDateString: string
): SeniorityCalcResult => {

  const result = useMemo<SeniorityCalcResult>(() => {
    if (!hireDateString) {
      return { seniority: null, fullYears: null, error: null };
    }

    const hireDate = parseDateString(hireDateString);
    if (!hireDate) {
      return { seniority: null, fullYears: null, error: '入社日の形式が正しくありません。' };
    }
    if (isFutureDate(hireDate)) {
      return { seniority: null, fullYears: null, error: '入社日に未来の日付は指定できません。' };
    }

    const referenceDate = referenceDateString ? parseDateString(referenceDateString) : new Date();
    if (!referenceDate) {
      return { seniority: null, fullYears: null, error: '基準日の形式が正しくありません。' };
    }
    if (isFutureDate(referenceDate)) {
        referenceDate.setTime(new Date().getTime());
    }

    if (hireDate > referenceDate) {
      return { seniority: null, fullYears: null, error: '入社日は基準日より前の日付にしてください。' };
    }

    const seniority = diffYMD(hireDate, referenceDate);
    const fullYears = toFullYears(seniority);

    return { seniority, fullYears, error: null };
  }, [hireDateString, referenceDateString]);

  return result;
};
