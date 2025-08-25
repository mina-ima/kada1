import { describe, it, expect } from 'vitest';
import { eras } from '../../src/lib/date/eras';

describe('eras', () => {
  it('should have the correct number of eras', () => {
    expect(eras.length).toBe(3);
  });

  it('should have correct data for Showa era', () => {
    const showa = eras[0];
    expect(showa.name).toBe('昭和');
    expect(showa.abbr).toBe('S');
    expect(showa.start.getFullYear()).toBe(1926);
    expect(showa.start.getMonth()).toBe(11);
    expect(showa.start.getDate()).toBe(25);
    expect(showa.end?.getFullYear()).toBe(1989);
    expect(showa.end?.getMonth()).toBe(0);
    expect(showa.end?.getDate()).toBe(7);
  });

  it('should have correct data for Heisei era', () => {
    const heisei = eras[1];
    expect(heisei.name).toBe('平成');
    expect(heisei.abbr).toBe('H');
    expect(heisei.start.getFullYear()).toBe(1989);
    expect(heisei.start.getMonth()).toBe(0);
    expect(heisei.start.getDate()).toBe(8);
    expect(heisei.end?.getFullYear()).toBe(2019);
    expect(heisei.end?.getMonth()).toBe(3);
    expect(heisei.end?.getDate()).toBe(30);
  });

  it('should have correct data for Reiwa era', () => {
    const reiwa = eras[2];
    expect(reiwa.name).toBe('令和');
    expect(reiwa.abbr).toBe('R');
    expect(reiwa.start.getFullYear()).toBe(2019);
    expect(reiwa.start.getMonth()).toBe(4);
    expect(reiwa.start.getDate()).toBe(1);
    expect(reiwa.end).toBeNull();
  });
});