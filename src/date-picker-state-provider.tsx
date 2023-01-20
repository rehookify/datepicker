import React, { createContext, useContext, FC, ReactNode } from 'react';

import { DatePickerUserConfig, DPState } from './types';
import { useDatePickerState } from './use-date-picker-state';

export interface DatePickerStateProviderProps {
  children: ReactNode;
  config?: DatePickerUserConfig;
}

export type DatePickerStateProviderValue = DPState;

const DatePickerStateContext = createContext<DatePickerStateProviderValue>(
  {} as DatePickerStateProviderValue,
);

export const useDatePickerStateContext = () => {
  const context = useContext(DatePickerStateContext);

  if (!context) {
    throw new Error(
      'Please use "useDatePickerStateContext" inside "DatePickerStateProvider"',
    );
  }

  return context;
};

export const DatePickerStateProvider: FC<DatePickerStateProviderProps> = ({
  children,
  config = {},
}) => {
  const s = useDatePickerState(config);

  return (
    <DatePickerStateContext.Provider value={s}>
      {children}
    </DatePickerStateContext.Provider>
  );
};
