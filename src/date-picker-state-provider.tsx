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

export const useDatePickerStateContext = () =>
  useContext(DatePickerStateContext);

export const DatePickerStateProvider: FC<DatePickerStateProviderProps> = ({
  children,
  config = {},
}) => (
  <DatePickerStateContext.Provider value={useDatePickerState(config)}>
    {children}
  </DatePickerStateContext.Provider>
);
