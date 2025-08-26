import { describe, it, expect } from 'vitest';
import {
  getBirthdayAtAge,
  endOfMonth,
  getFiscalYear,
  getSpecificMonthEndOfFY,
  resolveRetirementDate,
} from '../../src/lib/date/retirement';

describe('Retirement Date Calculation (UTC)', () => {
  const birthDate = new Date(Date.UTC(1965, 6, 15)); // July is 6
  const age = 60;

  it('getBirthdayAtAge: should return the correct birthday for a given age', () => {
    const expectedDate = new Date(Date.UTC(2025, 6, 15));
    expect(getBirthdayAtAge(birthDate, age)).toEqual(expectedDate);
  });

  it('endOfMonth: should return the last day of the month', () => {
    const date = new Date(Date.UTC(2025, 6, 15));
    const expectedDate = new Date(Date.UTC(2025, 7, 0)); // End of July
    expect(endOfMonth(date)).toEqual(expectedDate);
  });

  it('endOfMonth: should handle leap years correctly', () => {
    const date = new Date(Date.UTC(2024, 1, 10)); // February
    const expectedDate = new Date(Date.UTC(2024, 2, 0)); // End of February
    expect(endOfMonth(date)).toEqual(expectedDate);
  });

  it('getFiscalYear: should identify the correct fiscal year (April-March)', () => {
    const dateInMarch = new Date(Date.UTC(2026, 2, 15)); // FY2025
    const fy2025 = getFiscalYear(dateInMarch);
    expect(fy2025.start).toEqual(new Date(Date.UTC(2025, 3, 1)));
    expect(fy2025.end).toEqual(new Date(Date.UTC(2026, 3, 0)));

    const dateInApril = new Date(Date.UTC(2025, 3, 1)); // FY2025
    const fy2025_2 = getFiscalYear(dateInApril);
    expect(fy2025_2.start).toEqual(new Date(Date.UTC(2025, 3, 1)));
    expect(fy2025_2.end).toEqual(new Date(Date.UTC(2026, 3, 0)));
  });

  it('getSpecificMonthEndOfFY: should return the correct end of month in a fiscal year', () => {
    const expectedDate = new Date(Date.UTC(2026, 3, 0)); // End of March 2026
    expect(getSpecificMonthEndOfFY(birthDate, age, 3)).toEqual(expectedDate);
  });

  describe('resolveRetirementDate', () => {
    it('Rule [BIRTHDAY]: should return the birthday at age X', () => {
      const expected = new Date(Date.UTC(2025, 6, 15));
      const result = resolveRetirementDate('BIRTHDAY', birthDate, age);
      expect(result).toEqual(expected);
    });

    it('Rule [BIRTH_MONTH_END]: should return the end of the birth month at age X', () => {
      const expected = new Date(Date.UTC(2025, 7, 0));
      const result = resolveRetirementDate('BIRTH_MONTH_END', birthDate, age);
      expect(result).toEqual(expected);
    });

    it('Rule [FY_SPECIFIC_MONTH_END]: should return the specified month-end of the fiscal year at age X', () => {
      const expected = new Date(Date.UTC(2026, 3, 0));
      const result = resolveRetirementDate('FY_SPECIFIC_MONTH_END', birthDate, age, { specificMonth: 3 });
      expect(result).toEqual(expected);
    });

    it('Rule [CUSTOM_DATE]: should return the custom date at age X', () => {
      const expected = new Date(Date.UTC(2025, 11, 31)); // December
      const result = resolveRetirementDate('CUSTOM_DATE', birthDate, age, { customDate: { month: 12, day: 31 } });
      expect(result).toEqual(expected);
    });
  });
});