import React, { createContext, useContext } from 'react';

import { DatePickerContextValue, DatePickerProviderProps } from './types';
import { useDatePicker } from './use-date-picker';

var DatePickerContext = createContext<DatePickerContextValue>(
  {} as DatePickerContextValue,
);

export var useDatePickerContext = () => useContext(DatePickerContext);

export function DatePickerProvider({
  children,
  config,
}: DatePickerProviderProps): JSX.Element {
  return (
    <DatePickerContext.Provider value={useDatePicker(config)}>
      {children}
    </DatePickerContext.Provider>
  );
}
