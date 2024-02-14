import React, { createContext, useContext } from 'react';

import type { DatePickerProviderProps, DPState } from './types';
import { useDatePickerState } from './use-date-picker-state';

var DatePickerStateContext = createContext<DPState>({} as DPState);

export var useDatePickerStateContext = () => useContext(DatePickerStateContext);

export function DatePickerStateProvider({
  children,
  config,
}: DatePickerProviderProps): JSX.Element {
  return (
    <DatePickerStateContext.Provider value={useDatePickerState(config)}>
      {children}
    </DatePickerStateContext.Provider>
  );
}
