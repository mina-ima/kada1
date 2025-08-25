import { describe, it, expect } from 'vitest';
import { parseWareki } from '../../src/lib/date/parseWareki';

describe('parseWareki', () => {
  const testCases = [
    { input: 'R1/5/1', expected: new Date(2019, 4, 1) }, // Reiwa Gannen
    { input: 'H31-4-30', expected: new Date(2019, 3, 30) }, // Heisei end
    { input: 'S45.12.3', expected: new Date(1970, 11, 3) }, // Showa
    { input: 'R01/05/01', expected: new Date(2019, 4, 1) }, // Zero-padded
    { input: 'H1/1/1', expected: null }, // Heisei 1 (invalid, as Heisei starts Jan 8th)
    { input: 'S64/1/7', expected: new Date(1989, 0, 7) }, // Showa end
    { input: 'S64/1/8', expected: null }, // Invalid: Showa ended on 1/7
    { input: 'R5/2/29', expected: null }, // Leap year (2023 is not a leap year)
    { input: 'R4/2/29', expected: null }, // Leap year (2022 is not a leap year)
    { input: 'R2/2/29', expected: new Date(2020, 1, 29) }, // Leap year (2020 is a leap year)
    { input: 'R5/13/1', expected: null }, // Invalid month
    { input: 'R5/1/32', expected: null }, // Invalid day
    { input: 'X1/1/1', expected: null }, // Invalid era
    { input: 'R1/5', expected: null }, // Incomplete
  ];

  testCases.forEach((testCase, index) => {
    it(`should parse ${testCase.input} correctly (Test ${index + 1})`, () => {
      const result = parseWareki(testCase.input);
      if (testCase.expected === null) {
        expect(result).toBeNull();
      } else {
        expect(result?.getTime()).toBe(testCase.expected.getTime());
      }
    });
  });
});