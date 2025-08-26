interface RetirementIncomeResult {
  deduction: number;
  taxableIncome: number;
}

/**
 * 退職所得控除額と課税対象の退職所得を計算します。
 * @param fullYears 勤続年数（満年数）
 * @param amount 退職金の額
 * @returns {RetirementIncomeResult} 控除額と課税退職所得
 */
export const calculateRetirementIncome = (
  fullYears: number,
  amount: number
): RetirementIncomeResult => {
  let deduction: number;

  if (fullYears <= 0) {
    deduction = 0;
  } else if (fullYears === 1) {
    // 1年未満の端数は1年に切り上げるが、ここでは満年数1年＝80万
    deduction = 800_000;
  } else if (fullYears <= 20) {
    deduction = 400_000 * fullYears;
  } else {
    deduction = 8_000_000 + 700_000 * (fullYears - 20);
  }

  // 勤続1年未満のケースなどで、40万*年数が80万に満たない場合の最低保証
  if (fullYears > 1 && deduction < 800_000) {
      deduction = 800_000;
  }

  const incomeAfterDeduction = Math.max(0, amount - deduction);
  const taxableIncome = Math.floor(incomeAfterDeduction / 2);

  return { deduction, taxableIncome };
};
