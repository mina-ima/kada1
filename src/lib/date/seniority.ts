import type { Seniority } from '../../types';

/**
 * 2つの日付の差を年・月・日で計算します。
 * 民法第143条の考え方（初日不算入、応答日の前日に満了）を参考にしつつ、
 * 一般的な「期間計算」の慣習に合わせて調整しています。
 * @param start 開始日 (e.g., '2010-04-01')
 * @param end 終了日 (e.g., '2025-03-31')
 * @returns {Seniority} 年月日の差
 */
export const diffYMD = (start: Date, end: Date): Seniority => {
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months--;
    const daysInStartMonth = new Date(start.getFullYear(), start.getMonth() + 1, 0).getDate();
    days += daysInStartMonth;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
};

/**
 * Seniorityオブジェクトから満年数を返します。
 * @param seniority 勤続年数オブジェクト
 * @returns {number} 満年数（年の切り捨て）
 */
export const toFullYears = (seniority: Seniority): number => {
  return seniority.years;
};
