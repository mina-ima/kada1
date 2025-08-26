import React from 'react';
import DateInputField from '@/components/DateInputField.tsx';
import ErrorText from '@/components/ErrorText';
import { useAppContext } from '@/context/AppContext';
import type { RetirementRule } from '@/types';
import { formatWareki } from '@/lib/date/formatWareki';

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
    retirementIncomeAmount,
    setRetirementIncomeAmount,

    gregorianBirthdate,
    warekiBirthdate,
    calculatedAge,
    birthdateError,

    seniority,
    fullYears,
    seniorityError,

    retirementDate,
    remainingPeriod,
    isReached,
    retirementError,

    deductionAmount,
    taxableRetirementIncome,
  } = useAppContext();

  const formattedGregorianBirthdate = gregorianBirthdate 
    ? `${gregorianBirthdate.getFullYear()}年${gregorianBirthdate.getMonth() + 1}月${gregorianBirthdate.getDate()}日`
    : null;

  return (
    <div className="space-y-8">
      <div className="flex justify-center">
        <div className="w-2/3 max-w-xs">
          <DateInputField
            label="生年月日"
            value={birthDateString}
            onChange={(e) => setBirthDateString(e.target.value)}
            placeholder="例:R1/5/1,S45.12.3,1990/01/01"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-2/3 max-w-xs">
          <DateInputField
            label="入社日"
            value={hireDateString}
            onChange={(e) => setHireDateString(e.target.value)}
            placeholder="例:R1/5/1,S45.12.3,1990/01/01"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-2/3 max-w-xs">
          <DateInputField
            label="基準日（未入力は今日）"
            value={referenceDateString}
            onChange={(e) => setReferenceDateString(e.target.value)}
            placeholder="例:R1/5/1,S45.12.3,1990/01/01"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-2/3 max-w-xs">
          <label htmlFor="age" className="block text-xl font-medium text-gray-700">定年年齢 (歳)</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value, 10) || 0)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 text-5xl"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-2/3 max-w-xs">
          <label htmlFor="rule" className="block text-xl font-medium text-gray-700">定年ルール</label>
          <select
            id="rule"
            value={rule}
            onChange={(e) => setRule(e.target.value as RetirementRule)}
            className="mt-1 block w-full pl-3 pr-10 py-2 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md text-gray-700 text-5xl"
          >
            <option value="BIRTHDAY">誕生日</option>
            <option value="BIRTH_MONTH_END">誕生日の月末</option>
            <option value="FY_SPECIFIC_MONTH_END">年度の指定月末</option>
            {/* <option value="CUSTOM_DATE">任意の日</option> */}
          </select>
        </div>
      </div>

      {rule === 'FY_SPECIFIC_MONTH_END' && (
        <div className="flex justify-center">
          <div className="w-2/3 max-w-xs">
            <label htmlFor="specificMonth" className="block text-xl font-medium text-gray-700">指定月</label>
            <select
              id="specificMonth"
              value={specificMonth}
              onChange={(e) => setSpecificMonth(parseInt(e.target.value, 10))}
              className="mt-1 block w-full pl-3 pr-10 py-2 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md text-gray-700 text-5xl"
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <option key={m} value={m}>{m}月</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {birthdateError && <ErrorText message={birthdateError} />}
      {!birthdateError && gregorianBirthdate && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-blue-800">年齢・和暦 計算結果</h3>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="font-medium">生年月日 (西暦):</div>
            <div>{formattedGregorianBirthdate}</div>
            <div className="font-medium">生年月日 (和暦):</div>
            <div>{warekiBirthdate}</div>
            <div className="font-medium">年齢:</div>
            <div>{calculatedAge}歳</div>
          </div>
        </div>
      )}

      {seniorityError && <ErrorText message={seniorityError} />}
      {!seniorityError && seniority && (
        <div className="mt-4 p-4 bg-green-50 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-green-800">勤続年数 計算結果</h3>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="font-medium">勤続期間:</div>
            <div>{`${seniority.years}年 ${seniority.months}か月 ${seniority.days}日`}</div>
            <div className="font-medium">退職所得用勤続年数 (満年数):</div>
            <div>{fullYears}年</div>
          </div>
        </div>
      )}

      {retirementError && <ErrorText message={retirementError} />}
      {!retirementError && retirementDate && (
        <div className="mt-4 p-4 bg-purple-50 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-purple-800">定年まで 計算結果</h3>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="font-medium">定年退職日:</div>
            <div>{`${retirementDate.getFullYear()}年${retirementDate.getMonth() + 1}月${retirementDate.getDate()}日`} ({formatWareki(retirementDate)})</div>
            <div className="font-medium">残りの期間:</div>
            <div>
              {isReached ? (
                <span className="font-semibold text-gray-700">到達済み</span>
              ) : (
                remainingPeriod && `${remainingPeriod.years}年 ${remainingPeriod.months}か月 ${remainingPeriod.days}日`
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center">
        <div className="w-2/3 max-w-xs">
          <label htmlFor="retirementIncomeAmount" className="block text-xl font-medium text-gray-700">退職金額</label>
          <input
            type="text"
            id="retirementIncomeAmount"
            value={retirementIncomeAmount}
            onChange={(e) => setRetirementIncomeAmount(parseInt(e.target.value, 10) || 0)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 text-5xl"
          />
        </div>
      </div>

      {deductionAmount !== null && taxableRetirementIncome !== null && (
        <div className="mt-4 p-4 bg-yellow-50 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-yellow-800">退職所得 計算結果</h3>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="font-medium">退職所得控除額:</div>
            <div>{deductionAmount.toLocaleString()}円</div>
            <div className="font-medium">課税退職所得金額:</div>
            <div>{taxableRetirementIncome.toLocaleString()}円</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BirthdateForm;
