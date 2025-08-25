import React, { useState } from 'react';
import DateInputField from '@/components/DateInputField.tsx';

const BirthdateForm: React.FC = () => {
  const [birthdate, setBirthdate] = useState('');
  const [referenceDate, setReferenceDate] = useState('');

  const handleBirthdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthdate(e.target.value);
  };

  const handleReferenceDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReferenceDate(e.target.value);
  };

  const handleSubmit = () => {
    // TODO: Implement calculation trigger
    console.log('Birthdate:', birthdate);
    console.log('Reference Date:', referenceDate);
  };

  return (
    <div>
      <DateInputField
        label="生年月日"
        value={birthdate}
        onChange={handleBirthdateChange}
        placeholder="例: R1/5/1, 1990/01/01"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit();
          }
        }}
      />
      <DateInputField
        label="基準日 (任意)"
        value={referenceDate}
        onChange={handleReferenceDateChange}
        placeholder="例: R1/5/1, 1990/01/01 (未入力は今日)"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit();
          }
        }}
      />
      <button onClick={handleSubmit}>計算する</button>
      <p>例示: R1/5/1, H31-4-30, S45.12.3, 1990/01/01</p>
    </div>
  );
};

export default BirthdateForm;
