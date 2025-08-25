import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { isFutureDate } from '../../src/lib/date/validate';

describe('isFutureDate', () => {
  // Mock today's date to a specific value for consistent testing
  const mockToday = new Date(2025, 7, 25, 10, 0, 0); // August 25, 2025, 10:00:00

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(mockToday);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return false for a past date', () => {
    const pastDate = new Date(2025, 7, 24); // August 24, 2025
    expect(isFutureDate(pastDate)).toBe(false);
  });

  it("should return false for today's date", () => {
    const todayDate = new Date(2025, 7, 25, 5, 0, 0); // August 25, 2025, 05:00:00
    expect(isFutureDate(todayDate)).toBe(false);
  });

  it('should return true for a future date', () => {
    const futureDate = new Date(2025, 7, 26); // August 26, 2025
    expect(isFutureDate(futureDate)).toBe(true);
  });

  it('should return false for a date with same day but earlier time', () => {
    const earlierTimeToday = new Date(2025, 7, 25, 9, 0, 0); // August 25, 2025, 09:00:00
    expect(isFutureDate(earlierTimeToday)).toBe(false);
  });

  it('should return false for a date with same day but later time', () => {
    const laterTimeToday = new Date(2025, 7, 25, 15, 0, 0); // August 25, 2025, 15:00:00
    expect(isFutureDate(laterTimeToday)).toBe(false);
  });
});
