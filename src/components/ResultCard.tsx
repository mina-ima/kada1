import React from 'react';

interface ResultCardProps {
  gregorianDate: string | null;
  warekiDate: string | null;
  age: number | null;
}

const ResultCard: React.FC<ResultCardProps> = ({ gregorianDate, warekiDate, age }) => {
  if (!gregorianDate && !warekiDate && age === null) {
    return null; // Don't render if no data
  }

  return (
    <div className="p-6 rounded-lg shadow-md mt-6" style={{ backgroundColor: '#00FFFF' }}>
      <h2 className="text-xl font-bold text-blue-800 mb-4">計算結果</h2>
      {gregorianDate && <p className="text-gray-800 mb-2" style={{ fontSize: '2rem' }}>西暦: {gregorianDate}</p>}
      {warekiDate && <p className="text-gray-800 mb-2" style={{ fontSize: '2rem' }}>和暦: {warekiDate}</p>}
      {age !== null && <p className="text-gray-800" style={{ fontSize: '2rem' }}>年齢: {age}歳</p>}
    </div>
  );
};

export default ResultCard;