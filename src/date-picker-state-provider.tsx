import React, { createContext, FC, useContext } from 'react';

import type { DatePickerProviderProps, DPState } from './types';
import { useDatePickerState } from './use-date-picker-state';

const DatePickerStateContext = createContext<DPState>({} as DPState);

export const useDatePickerStateContext = () =>
  useContext(DatePickerStateContext);

export const DatePickerStateProvider: FC<DatePickerProviderProps> = ({
  children,
  config,
}) => (
  <DatePickerStateContext.Provider value={useDatePickerState(config)}>
    {children}
  </DatePickerStateContext.Provider>
);
