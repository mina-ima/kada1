import React from 'react';
import DateInputField from '@/components/DateInputField.tsx';
import ResultCard from '@/components/ResultCard';
import ErrorText from '@/components/ErrorText';
import { useBirthdateCalc } from './useBirthdateCalc';
import { useAppContext } from '@/context/AppContext';
import type { RetirementRule } from '@/types';

const BirthdateForm: React.FC = () => {
  const {
    birthDateString,
    setBirthDateString,
    hireDateString,
    setHireDateString,
    referenceDateString,
    setReferenceDateString,
    age,
    setAge,
    rule,
    setRule,
    specificMonth,
    setSpecificMonth,
  } = useAppContext();

  const { gregorianBirthdate, warekiBirthdate, age: calculatedAge, error } = useBirthdateCalc();

  const formattedGregorianBirthdate = gregorianBirthdate 
    ? `${gregorianBirthdate.getFullYear()}年${gregorianBirthdate.getMonth() + 1}月${gregorianBirthdate.getDate()}日`
    : null;

  return (
    <div className="space-y-4">
      <DateInputField
        label="生年月日"
        value={birthDateString}
        onChange={(e) => setBirthDateString(e.target.value)}
        placeholder="例:R1/5/1,S45.12.3,1990/01/01"
      />
      <DateInputField
        label="入社日"
        value={hireDateString}
        onChange={(e) => setHireDateString(e.target.value)}
        placeholder="例:R1/5/1,S45.12.3,1990/01/01"
      />
      <DateInputField
        label="基準日（未入力は今日）"
        value={referenceDateString}
        onChange={(e) => setReferenceDateString(e.target.value)}
        placeholder="例:R1/5/1,S45.12.3,1990/01/01"
      />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700">定年年齢 (歳)</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value, 10) || 0)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="rule" className="block text-sm font-medium text-gray-700">定年ルール</label>
          <select
            id="rule"
            value={rule}
            onChange={(e) => setRule(e.target.value as RetirementRule)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="BIRTHDAY">誕生日</option>
            <option value="BIRTH_MONTH_END">誕生日の月末</option>
            <option value="FY_SPECIFIC_MONTH_END">年度の指定月末</option>
            {/* <option value="CUSTOM_DATE">任意の日</option> */}
          </select>
        </div>
      </div>

      {rule === 'FY_SPECIFIC_MONTH_END' && (
        <div>
          <label htmlFor="specificMonth" className="block text-sm font-medium text-gray-700">指定月</label>
          <select
            id="specificMonth"
            value={specificMonth}
            onChange={(e) => setSpecificMonth(parseInt(e.target.value, 10))}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
              <option key={m} value={m}>{m}月</option>
            ))}
          </select>
        </div>
      )}

      {error && <ErrorText message={error} />}
      {!error && gregorianBirthdate && (
        <ResultCard
          gregorianDate={formattedGregorianBirthdate}
          warekiDate={warekiBirthdate}
          age={calculatedAge}
        />
      )}
    </div>
  );
};

export default BirthdateForm;
