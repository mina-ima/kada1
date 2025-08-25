import { describe, it, expect } from 'vitest';
import { parseGregorian } from '../../src/lib/date/parseGregorian';

describe('parseGregorian', () => {
  // Valid date formats
  it('should parse yyyy/m/d correctly', () => {
    expect(parseGregorian('1990/1/1')?.getTime()).toBe(new Date(1990, 0, 1).getTime());
  });

  it('should parse yyyy-m-d correctly', () => {
    expect(parseGregorian('2000-12-31')?.getTime()).toBe(new Date(2000, 11, 31).getTime());
  });

  it('should parse yyyy.m.d correctly', () => {
    expect(parseGregorian('2023.5.15')?.getTime()).toBe(new Date(2023, 4, 15).getTime());
  });

  it('should parse yyyy m d correctly', () => {
    expect(parseGregorian('2024 2 29')?.getTime()).toBe(new Date(2024, 1, 29).getTime());
  });

  // Invalid dates (non-existent days)
  it('should return null for Feb 29 in a non-leap year', () => {
    expect(parseGregorian('2023/2/29')).toBeNull();
  });

  it('should return null for Feb 30', () => {
    expect(parseGregorian('2024/2/30')).toBeNull();
  });

  it('should return null for Apr 31', () => {
    expect(parseGregorian('2023/4/31')).toBeNull();
  });

  it('should return null for invalid month', () => {
    expect(parseGregorian('2023/13/1')).toBeNull();
  });

  it('should return null for invalid day', () => {
    expect(parseGregorian('2023/1/0')).toBeNull();
  });

  // Invalid formats
  it('should return null for incomplete date', () => {
    expect(parseGregorian('2023/1')).toBeNull();
  });

  it('should return null for text input', () => {
    expect(parseGregorian('abc')).toBeNull();
  });

  it('should return null for empty string', () => {
    expect(parseGregorian('')).toBeNull();
  });
});
