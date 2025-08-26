import React, { useState, useMemo } from 'react';
import { useSeniorityCalc } from '../seniority/useSeniorityCalc';
import { calculateRetirementIncome } from '../../lib/finance/retirementIncome';

const RetirementIncomeForm: React.FC = () => {
  const { fullYears } = useSeniorityCalc();
  const [amount, setAmount] = useState<number>(0);

  const result = useMemo(() => {
    if (fullYears === null || fullYears < 0) return null;
    return calculateRetirementIncome(fullYears, amount);
  }, [fullYears, amount]);

  if (fullYears === null) {
    return (
      <div className="p-4 text-center text-gray-500 bg-gray-50 rounded-lg">
        <p>先に「勤続年数」タブで有効な入社日を入力してください。</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="fullYears" className="block text-sm font-medium text-gray-700">勤続年数（満）</label>
        <input
          type="text"
          id="fullYears"
          value={`${fullYears} 年`}
          readOnly
          className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">退職金額（円）</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="例: 15000000"
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {result && (
        <div className="mt-4 p-4 bg-purple-50 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-purple-800">計算結果</h3>
          <table className="w-full mt-2 text-left">
            <tbody>
              <tr className="border-b">
                <td className="py-2 font-medium">退職所得控除額</td>
                <td className="py-2 text-right">{result.deduction.toLocaleString('ja-JP')} 円</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-medium">課税退職所得金額</td>
                <td className="py-2 text-right font-bold text-lg">{result.taxableIncome.toLocaleString('ja-JP')} 円</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RetirementIncomeForm;