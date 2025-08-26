import { useMemo } from 'react';
import { parseWareki } from '../../lib/date/parseWareki';
import { parseGregorian } from '../../lib/date/parseGregorian';
import { isFutureDate } from '../../lib/date/validate';
import { resolveRetirementDate } from '../../lib/date/retirement';
import { diffYMD } from '../../lib/date/seniority';
import type { RetirementRule, Seniority } from '../../types';
import { useAppContext } from '../../context/AppContext';

interface RetirementCalcResult {
  retirementDate: Date | null;
  remainingPeriod: Seniority | null;
  isReached: boolean;
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

interface RetirementOptions {
  specificMonth?: number;
  customDate?: { month: number; day: number };
}

export const useRetirementCalc = (
  age: number,
  rule: RetirementRule,
  options: RetirementOptions
): RetirementCalcResult => {
  const { birthDateString, referenceDateString } = useAppContext();

  const result = useMemo<RetirementCalcResult>(() => {
    if (!birthDateString || !age) {
      return { retirementDate: null, remainingPeriod: null, isReached: false, error: null };
    }

    const birthDate = parseDateString(birthDateString);
    if (!birthDate) {
      return { retirementDate: null, remainingPeriod: null, isReached: false, error: '生年月日の形式が正しくありません。' };
    }
    if (isFutureDate(birthDate)) {
      return { retirementDate: null, remainingPeriod: null, isReached: false, error: '生年月日に未来の日付は指定できません。' };
    }

    const referenceDate = referenceDateString ? parseDateString(referenceDateString) : new Date();
    if (!referenceDate) {
      return { retirementDate: null, remainingPeriod: null, isReached: false, error: '基準日の形式が正しくありません。' };
    }
    if (isFutureDate(referenceDate)) {
        referenceDate.setTime(new Date().getTime());
    }

    try {
      const retirementDate = resolveRetirementDate(rule, birthDate, age, options);
      
      if (retirementDate < referenceDate) {
        return { retirementDate, remainingPeriod: null, isReached: true, error: null };
      }

      const remainingPeriod = diffYMD(referenceDate, retirementDate);

      return { retirementDate, remainingPeriod, isReached: false, error: null };
    } catch (e) {
      if (e instanceof Error) {
        return { retirementDate: null, remainingPeriod: null, isReached: false, error: e.message };
      }
      return { retirementDate: null, remainingPeriod: null, isReached: false, error: '計算中に不明なエラーが発生しました。' };
    }

  }, [birthDateString, referenceDateString, age, rule, options]);

  return result;
};