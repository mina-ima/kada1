import { describe, it, expect } from 'vitest';
import { diffYMD, toFullYears } from '../../src/lib/date/seniority';

describe('diffYMD', () => {
  it('should correctly calculate the difference between two dates', () => {
    const start = new Date('2010-04-01');
    const end = new Date('2025-08-26');
    expect(diffYMD(start, end)).toEqual({ years: 15, months: 4, days: 25 });
  });

  it('should handle leap years correctly when start is a leap day', () => {
    const start = new Date('2012-02-29');
    const end = new Date('2013-02-28');
    // 2012/2/29 -> 2013/2/28 = 1年0ヶ月-1日 -> 0年11ヶ月28日 (2月は28日)
    expect(diffYMD(start, end)).toEqual({ years: 0, months: 11, days: 28 });
  });

  it('should handle month-end transitions correctly', () => {
    const start = new Date('2024-01-31');
    const end = new Date('2024-02-29'); // Leap year
    expect(diffYMD(start, end)).toEqual({ years: 0, months: 0, days: 29 });
  });

  it('should handle year-end transitions', () => {
    const start = new Date('2023-12-31');
    const end = new Date('2024-01-01');
    expect(diffYMD(start, end)).toEqual({ years: 0, months: 0, days: 1 });
  });

  it('should calculate exactly one year', () => {
    const start = new Date('2022-08-26');
    const end = new Date('2023-08-26');
    expect(diffYMD(start, end)).toEqual({ years: 1, months: 0, days: 0 });
  });

  it('should return zero for the same start and end date', () => {
    const start = new Date('2025-01-01');
    const end = new Date('2025-01-01');
    expect(diffYMD(start, end)).toEqual({ years: 0, months: 0, days: 0 });
  });
});

describe('toFullYears', () => {
  it('should return the full years from a Seniority object', () => {
    expect(toFullYears({ years: 15, months: 4, days: 25 })).toBe(15);
  });

  it('should return 0 if years is 0', () => {
    expect(toFullYears({ years: 0, months: 11, days: 28 })).toBe(0);
  });
});
