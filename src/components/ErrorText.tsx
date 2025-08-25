import React from 'react';

interface ErrorTextProps {
  message: string | null;
}

const ErrorText: React.FC<ErrorTextProps> = ({ message }) => {
  if (!message) {
    return null;
  }

  return (
    <p className="text-red-500 text-sm mt-2">{message}</p>
  );
};

export default ErrorText;