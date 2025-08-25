import React, { useRef } from 'react';

interface DateInputFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const DateInputField: React.FC<DateInputFieldProps> = ({ label, value, onChange, placeholder }) => {
  const dateInputRef = useRef<HTMLInputElement>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    // TODO: Attempt to parse text and update dateInputRef.current.value
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // When date picker changes, update the text input
    if (e.target.value) {
      // Format the date to yyyy/mm/dd for now
      const [year, month, day] = e.target.value.split('-');
      onChange({ ...e, target: { ...e.target, value: `${year}/${parseInt(month)}/${parseInt(day)}` } });
    } else {
      onChange(e);
    }
  };

  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <input
        type="text"
        id={label}
        value={value}
        onChange={handleTextChange}
        placeholder={placeholder}
      />
      <input
        type="date"
        ref={dateInputRef}
        onChange={handleDateChange}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default DateInputField;
