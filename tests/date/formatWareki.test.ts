import { describe, it, expect } from 'vitest';
import { formatWareki } from '../../src/lib/date/formatWareki';

describe('formatWareki', () => {
  it('should format Reiwa Gannen correctly', () => {
    const date = new Date(2019, 4, 1); // May 1, 2019 (Reiwa Gannen)
    expect(formatWareki(date)).toBe('令和元年5月1日');
  });

  it('should format Reiwa year 2 correctly', () => {
    const date = new Date(2020, 0, 1); // Jan 1, 2020 (Reiwa 2)
    expect(formatWareki(date)).toBe('令和2年1月1日');
  });

  it('should format Heisei correctly', () => {
    const date = new Date(1989, 0, 8); // Jan 8, 1989 (Heisei Gannen)
    expect(formatWareki(date)).toBe('平成元年1月8日');
  });

  it('should format Showa correctly', () => {
    const date = new Date(1926, 11, 25); // Dec 25, 1926 (Showa Gannen)
    expect(formatWareki(date)).toBe('昭和元年12月25日');
  });

  it('should return null for a date before Showa', () => {
    const date = new Date(1926, 11, 24); // Dec 24, 1926
    expect(formatWareki(date)).toBeNull();
  });

  it('should format a future Reiwa date correctly', () => {
    const date = new Date(2030, 0, 1); 
    expect(formatWareki(date)).toBe('令和12年1月1日');
  });

  it('should format Heisei end date correctly', () => {
    const date = new Date(2019, 3, 30); // April 30, 2019 (Heisei 31)
    expect(formatWareki(date)).toBe('平成31年4月30日');
  });

  it('should format Showa end date correctly', () => {
    const date = new Date(1989, 0, 7); // Jan 7, 1989 (Showa 64)
    expect(formatWareki(date)).toBe('昭和64年1月7日');
  });
});
