import { describe, it, expect, vi } from 'vitest';
import { calculateAge } from '../../src/lib/date/age';

describe('calculateAge', () => {
  // Test case 1: Basic age calculation
  it('should calculate age correctly for a simple case', () => {
    const birthdate = new Date(1990, 0, 1); // Jan 1, 1990
    const referenceDate = new Date(2020, 0, 1); // Jan 1, 2020
    expect(calculateAge(birthdate, referenceDate)).toBe(30);
  });

  // Test case 2: Age when birthday has passed in the year
  it('should calculate age correctly when birthday has passed', () => {
    const birthdate = new Date(1990, 5, 15); // June 15, 1990
    const referenceDate = new Date(2020, 6, 1); // July 1, 2020
    expect(calculateAge(birthdate, referenceDate)).toBe(30);
  });

  // Test case 3: Age when birthday has not yet passed in the year
  it('should calculate age correctly when birthday has not yet passed', () => {
    const birthdate = new Date(1990, 8, 15); // Sep 15, 1990
    const referenceDate = new Date(2020, 6, 1); // July 1, 2020
    expect(calculateAge(birthdate, referenceDate)).toBe(29);
  });

  // Test case 4: Age on the exact birthday
  it('should calculate age correctly on the exact birthday', () => {
    const birthdate = new Date(1990, 0, 1); // Jan 1, 1990
    const referenceDate = new Date(2020, 0, 1); // Jan 1, 2020
    expect(calculateAge(birthdate, referenceDate)).toBe(30);
  });

  // Test case 5: Age with reference date defaulting to today (mocking Date)
  it('should default referenceDate to today and calculate age correctly', () => {
    // Mock today's date to a specific value for consistent testing
    const mockDate = new Date(2025, 7, 25); // August 25, 2025
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);

    const birthdate = new Date(1995, 7, 25); // August 25, 1995
    expect(calculateAge(birthdate)).toBe(30);

    const birthdateBefore = new Date(1995, 7, 26); // August 26, 1995
    expect(calculateAge(birthdateBefore)).toBe(29);

    const birthdateAfter = new Date(1995, 7, 24); // August 24, 1995
    expect(calculateAge(birthdateAfter)).toBe(30);

    vi.useRealTimers(); // Restore real timers
  });

  // Test case 6: Leap year birthdate
  it('should handle leap year birthdates correctly', () => {
    const birthdate = new Date(2000, 1, 29); // Feb 29, 2000
    const referenceDate = new Date(2020, 1, 29); // Feb 29, 2020
    expect(calculateAge(birthdate, referenceDate)).toBe(20);

    const referenceDateBeforeLeap = new Date(2021, 1, 28); // Feb 28, 2021
    expect(calculateAge(birthdate, referenceDateBeforeLeap)).toBe(20);

    const referenceDateAfterLeap = new Date(2021, 2, 1); // Mar 1, 2021
    expect(calculateAge(birthdate, referenceDateAfterLeap)).toBe(21);
  });
});
