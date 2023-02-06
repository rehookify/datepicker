import React, { createContext, useContext, FC, ReactNode } from 'react';
import { DatePickerUserConfig } from './types';
import { useDatePicker } from './use-date-picker';

export type DatePickerContextValue = ReturnType<typeof useDatePicker>;

export interface DatePickerProviderProps {
  children: ReactNode;
  config?: DatePickerUserConfig;
}

const DatePickerContext = createContext<DatePickerContextValue>(
  {} as DatePickerContextValue,
);

export const useDatePickerContext = () => useContext(DatePickerContext);

export const DatePickerProvider: FC<DatePickerProviderProps> = ({
  children,
  config = {},
}) => (
  <DatePickerContext.Provider value={useDatePicker(config)}>
    {children}
  </DatePickerContext.Provider>
);
