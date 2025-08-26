import React from 'react';
import ErrorText from '../../components/ErrorText';
import { useSeniorityCalc } from './useSeniorityCalc';
import type { Seniority } from '../../types';

// このフォーム専用の結果表示コンポーネント
const SeniorityResult: React.FC<{ seniority: Seniority; fullYears: number }> = ({ seniority, fullYears }) => (
  <div className="mt-4 p-4 bg-blue-50 rounded-lg shadow">
    <h3 className="text-lg font-semibold text-blue-800">計算結果</h3>
    <div className="grid grid-cols-2 gap-2 mt-2">
      <div className="font-medium">勤続年数（実計算）:</div>
      <div>{`${seniority.years}年 ${seniority.months}か月 ${seniority.days}日`}</div>
      <div className="font-medium">勤続年数（退職所得用）:</div>
      <div>{`${fullYears}年`}</div>
    </div>
  </div>
);

const SeniorityForm: React.FC = () => {
  const { seniority, fullYears, error } = useSeniorityCalc();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">勤続年数計算</h2>
      <p className="text-gray-600 mb-4">「年齢・和暦」タブで入社日と基準日を入力してください。</p>

      {error && <ErrorText message={error} />}
      {seniority && fullYears !== null && (
        <SeniorityResult seniority={seniority} fullYears={fullYears} />
      )}
    </div>
  );
};

export default SeniorityForm;
