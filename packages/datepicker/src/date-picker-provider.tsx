import React, { createContext, ReactNode, useContext } from 'react';

import { DatePickerContextValue, DatePickerProviderProps } from './types';
import { useDatePicker } from './use-date-picker';

var DatePickerContext = createContext<DatePickerContextValue>(
  {} as DatePickerContextValue,
);

var useDatePickerContext = () => useContext(DatePickerContext);

function DatePickerProvider({
  children,
  config,
}: DatePickerProviderProps): ReactNode {
  return (
    <DatePickerContext.Provider value={useDatePicker(config)}>
      {children}
    </DatePickerContext.Provider>
  );
}

export { DatePickerProvider, useDatePickerContext };
