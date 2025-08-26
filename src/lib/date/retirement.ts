import type { RetirementRule } from '../../types';

/**
 * 指定された年齢になる誕生日を計算します。(UTCベース)
 */
export const getBirthdayAtAge = (birthDate: Date, age: number): Date => {
  return new Date(Date.UTC(
    birthDate.getUTCFullYear() + age,
    birthDate.getUTCMonth(),
    birthDate.getUTCDate()
  ));
};

/**
 * 与えられた日付の月末日を返します。(UTCベース)
 */
export const endOfMonth = (date: Date): Date => {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0));
};

/**
 * 日本の年度（4月1日始まり）を取得します。(UTCベース)
 * @returns {{start: Date, end: Date}} 年度の開始日と終了日
 */
export const getFiscalYear = (date: Date): { start: Date; end: Date } => {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth(); // 0-11
  const fiscalYearStartYear = month >= 3 ? year : year - 1; // 3 is April
  return {
    start: new Date(Date.UTC(fiscalYearStartYear, 3, 1)),
    end: new Date(Date.UTC(fiscalYearStartYear + 1, 3, 0)), // Month is 0-indexed, so 3 is April, 0 is end of March
  };
};

/**
 * X歳に到達する年度の、指定された月の末日を計算します。(UTCベース)
 */
export const getSpecificMonthEndOfFY = (birthDate: Date, age: number, specificMonth: number): Date => {
  const birthdayAtAge = getBirthdayAtAge(birthDate, age);
  const fiscalYear = getFiscalYear(birthdayAtAge);
  const targetYear = fiscalYear.start.getUTCFullYear();
  
  const yearForMonth = specificMonth < 4 ? targetYear + 1 : targetYear;
  return new Date(Date.UTC(yearForMonth, specificMonth, 0));
};

interface RetirementDateOptions {
  specificMonth?: number; // For FY_SPECIFIC_MONTH_END
  customDate?: { month: number; day: number }; // For CUSTOM_DATE
}

/**
 * 定年ルールに基づいて定年退職日を解決します。(UTCベース)
 */
export const resolveRetirementDate = (
  rule: RetirementRule,
  birthDate: Date,
  age: number,
  options: RetirementDateOptions = {}
): Date => {
  const birthdayAtAge = getBirthdayAtAge(birthDate, age);

  switch (rule) {
    case 'BIRTHDAY':
      return birthdayAtAge;

    case 'BIRTH_MONTH_END':
      return endOfMonth(birthdayAtAge);

    case 'FY_SPECIFIC_MONTH_END':
      if (!options.specificMonth || options.specificMonth < 1 || options.specificMonth > 12) {
        throw new Error('Invalid specific month');
      }
      return getSpecificMonthEndOfFY(birthDate, age, options.specificMonth);

    case 'CUSTOM_DATE':
      if (!options.customDate) {
        throw new Error('Invalid custom date');
      }
      return new Date(Date.UTC(
        birthdayAtAge.getUTCFullYear(),
        options.customDate.month - 1,
        options.customDate.day
      ));

    default:
      throw new Error('Unknown retirement rule');
  }
};