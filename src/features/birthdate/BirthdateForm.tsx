import React, { useState } from 'react';
import DateInputField from '@/components/DateInputField.tsx';
import ResultCard from '@/components/ResultCard';
import ErrorText from '@/components/ErrorText';
import { useBirthdateCalc } from './useBirthdateCalc';

const BirthdateForm: React.FC = () => {
  const [birthdateInput, setBirthdateInput] = useState('');
  const [referenceDateInput, setReferenceDateInput] = useState('');
  const [showResult, setShowResult] = useState(false);

  const { gregorianBirthdate, warekiBirthdate, age, error } = useBirthdateCalc(birthdateInput, referenceDateInput);

  const handleBirthdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthdateInput(e.target.value);
    setShowResult(false); // Hide result when input changes
  };

  const handleReferenceDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReferenceDateInput(e.target.value);
    setShowResult(false); // Hide result when input changes
  };

  const handleSubmit = () => {
    setShowResult(true);
  };

  // Format gregorianBirthdate for display
  const formattedGregorianBirthdate = gregorianBirthdate 
    ? `${gregorianBirthdate.getFullYear()}年${gregorianBirthdate.getMonth() + 1}月${gregorianBirthdate.getDate()}日`
    : null;

  return (
    <div className="space-y-4">
      <DateInputField
        label="生年月日"
        value={birthdateInput}
        onChange={handleBirthdateChange}
        placeholder="例:R1/5/1,S45.12.3,1990/01/01"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit();
          }
        }}
      />
      <br />
      <DateInputField
        label="基準日（未入力は今日）"
        value={referenceDateInput}
        onChange={handleReferenceDateChange}
        placeholder="例:R1/5/1,S45.12.3,1990/01/01"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit();
          }
        }}
      />
      <br />
      <button 
        onClick={handleSubmit}
        className="text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline text-lg"
        style={{ backgroundColor: '#00bfff' }}
      >
        計算する
      </button>

      {showResult && error && <ErrorText message={error} />}
      {showResult && !error && (
        <ResultCard
          gregorianDate={formattedGregorianBirthdate}
          warekiDate={warekiBirthdate}
          age={age}
        />
      )}
    </div>
  );
};

export default BirthdateForm;
