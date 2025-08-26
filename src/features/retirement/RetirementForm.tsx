import React from 'react';
import ErrorText from '../../components/ErrorText';
import { useRetirementCalc } from './useRetirementCalc';
import type { RetirementRule, Seniority } from '../../types';
import { formatWareki } from '../../lib/date/formatWareki';
import { useAppContext } from '../../context/AppContext';

const ResultDisplay: React.FC<{ date: Date; period: Seniority | null; isReached: boolean }> = ({ date, period, isReached }) => (
  <div className="mt-4 p-4 bg-green-50 rounded-lg shadow">
    <h3 className="text-lg font-semibold text-green-800">計算結果</h3>
    <div className="grid grid-cols-2 gap-2 mt-2">
      <div className="font-medium">定年退職日:</div>
      <div>
        {`${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`} ({formatWareki(date)})
      </div>
      <div className="font-medium">残りの期間:</div>
      <div>
        {isReached ? (
          <span className="font-semibold text-gray-700">到達済み</span>
        ) : (
          period && `${period.years}年 ${period.months}か月 ${period.days}日`
        )}
      </div>
    </div>
  </div>
);

const RetirementForm: React.FC = () => {
  const { age, rule, specificMonth } = useAppContext();

  const options = {
    specificMonth: rule === 'FY_SPECIFIC_MONTH_END' ? specificMonth : undefined,
  };

  const { retirementDate, remainingPeriod, isReached, error } = useRetirementCalc(
    age,
    rule,
    options
  );

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">定年までの期間計算</h2>
      <p className="text-gray-600 mb-4">「年齢・和暦」タブで生年月日、定年年齢、定年ルールを入力してください。</p>

      {error && <ErrorText message={error} />}
      {retirementDate && (
        <ResultDisplay date={retirementDate} period={remainingPeriod} isReached={isReached} />
      )}
    </div>
  );
};

export default RetirementForm;
