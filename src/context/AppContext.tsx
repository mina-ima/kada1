import React, { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';
import type { RetirementRule } from '../types';

interface AppContextType {
  birthDateString: string;
  setBirthDateString: (date: string) => void;
  hireDateString: string;
  setHireDateString: (date: string) => void;
  referenceDateString: string;
  setReferenceDateString: (date: string) => void;
  age: number;
  setAge: (age: number) => void;
  rule: RetirementRule;
  setRule: (rule: RetirementRule) => void;
  specificMonth: number;
  setSpecificMonth: (month: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [birthDateString, setBirthDateString] = useState('');
  const [hireDateString, setHireDateString] = useState('');
  const [referenceDateString, setReferenceDateString] = useState('');
  const [age, setAge] = useState(60);
  const [rule, setRule] = useState<RetirementRule>('BIRTHDAY');
  const [specificMonth, setSpecificMonth] = useState(3);

  const value = {
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
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};