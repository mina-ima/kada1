import React, { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';
import type { RetirementRule, Seniority } from '../types';
import { useBirthdateCalc } from '../features/birthdate/useBirthdateCalc';
import { useSeniorityCalc } from '../features/seniority/useSeniorityCalc';
import { useRetirementCalc } from '../features/retirement/useRetirementCalc';
import { calculateRetirementIncome } from '../lib/finance/retirementIncome';

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
  
  // Birthdate Calculation Results
  gregorianBirthdate: Date | null;
  warekiBirthdate: string | null;
  calculatedAge: number | null;
  birthdateError: string | null;

  // Seniority Calculation Results
  seniority: Seniority | null;
  fullYears: number | null;
  seniorityError: string | null;

  // Retirement Calculation Results
  retirementDate: Date | null;
  remainingPeriod: Seniority | null;
  isReached: boolean;
  retirementError: string | null;

  // Retirement Income Calculation Results
  retirementIncomeAmount: number;
  setRetirementIncomeAmount: (amount: number) => void;
  deductionAmount: number | null;
  taxableRetirementIncome: number | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [birthDateString, setBirthDateString] = useState('');
  const [hireDateString, setHireDateString] = useState('');
  const [referenceDateString, setReferenceDateString] = useState('');
  const [age, setAge] = useState(60);
  const [rule, setRule] = useState<RetirementRule>('BIRTHDAY');
  const [specificMonth, setSpecificMonth] = useState(3);
  const [retirementIncomeAmount, setRetirementIncomeAmount] = useState(0);

  const { gregorianBirthdate, warekiBirthdate, age: calculatedAge, error: birthdateError } = useBirthdateCalc(birthDateString, referenceDateString);
  const { seniority, fullYears, error: seniorityError } = useSeniorityCalc(hireDateString, referenceDateString);
  const { retirementDate, remainingPeriod, isReached, error: retirementError } = useRetirementCalc(age, rule, { specificMonth: rule === 'FY_SPECIFIC_MONTH_END' ? specificMonth : undefined }, birthDateString, referenceDateString);
    const { deduction: deductionAmount, taxableIncome: taxableRetirementIncome } = calculateRetirementIncome(fullYears || 0, retirementIncomeAmount);

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