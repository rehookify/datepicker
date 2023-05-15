import React, { createContext, FC, useContext } from 'react';

import { DatePickerContextValue, DatePickerProviderProps } from './types';
import { useDatePicker } from './use-date-picker';

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
