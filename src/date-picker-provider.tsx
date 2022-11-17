import React, { createContext, useContext, FC, ReactNode } from 'react';
import { DatePickerUserConfig } from './types';
import { useDatePicker } from './use-date-picker';

export type DatePickerContextVale = ReturnType<typeof useDatePicker>;

export interface DatePickerProviderProps {
  children: ReactNode;
  config?: DatePickerUserConfig;
}

const DatePickerContext = createContext<DatePickerContextVale>(
  {} as DatePickerContextVale,
);

export const useDatePickerContext = () => {
  const context = useContext(DatePickerContext);

  if (!context) {
    throw new Error(
      'Please use "useDatePickerContext" inside "DatePickerProvider"',
    );
  }

  return context;
};

export const DatePickerProvider: FC<DatePickerProviderProps> = ({
  children,
  config = {},
}) => {
  const value = useDatePicker(config);

  return (
    <DatePickerContext.Provider value={value}>
      {children}
    </DatePickerContext.Provider>
  );
};
