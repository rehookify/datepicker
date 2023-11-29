import React, { createContext, ReactNode, useContext } from 'react';

import type { DatePickerProviderProps, DPState } from './types';
import { useDatePickerState } from './use-date-picker-state';

var DatePickerStateContext = createContext<DPState>({} as DPState);

var useDatePickerStateContext = () => useContext(DatePickerStateContext);

function DatePickerStateProvider({
  children,
  config,
}: DatePickerProviderProps): ReactNode {
  return (
    <DatePickerStateContext.Provider value={useDatePickerState(config)}>
      {children}
    </DatePickerStateContext.Provider>
  );
}

export { DatePickerStateProvider, useDatePickerStateContext };
