import { describe, it, expect } from 'vitest';
import { calculateRetirementIncome } from '../../src/lib/finance/retirementIncome';

describe('calculateRetirementIncome', () => {
  it('should calculate correctly for 19 years of service', () => {
    const result = calculateRetirementIncome(19, 10_000_000);
    const expectedDeduction = 400_000 * 19; // 7,600,000
    expect(result.deduction).toBe(expectedDeduction);
    expect(result.taxableIncome).toBe((10_000_000 - expectedDeduction) / 2);
  });

  it('should calculate correctly for 20 years of service', () => {
    const result = calculateRetirementIncome(20, 10_000_000);
    const expectedDeduction = 400_000 * 20; // 8,000,000
    expect(result.deduction).toBe(expectedDeduction);
    expect(result.taxableIncome).toBe((10_000_000 - expectedDeduction) / 2);
  });

  it('should calculate correctly for 21 years of service', () => {
    const result = calculateRetirementIncome(21, 15_000_000);
    const expectedDeduction = 8_000_000 + 700_000 * (21 - 20); // 8,700,000
    expect(result.deduction).toBe(expectedDeduction);
    expect(result.taxableIncome).toBe((15_000_000 - expectedDeduction) / 2);
  });

  it('should apply the minimum deduction of 800,000 for 1 year', () => {
    const result = calculateRetirementIncome(1, 1_000_000);
    expect(result.deduction).toBe(800_000);
    expect(result.taxableIncome).toBe((1_000_000 - 800_000) / 2);
  });

  it('should result in zero taxable income if amount is less than deduction', () => {
    const result = calculateRetirementIncome(10, 3_000_000);
    const expectedDeduction = 400_000 * 10; // 4,000,000
    expect(result.deduction).toBe(expectedDeduction);
    expect(result.taxableIncome).toBe(0);
  });

  it('should handle zero years of service', () => {
    const result = calculateRetirementIncome(0, 1_000_000);
    expect(result.deduction).toBe(0);
    expect(result.taxableIncome).toBe(1_000_000 / 2);
  });
});
