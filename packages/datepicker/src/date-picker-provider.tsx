import React, { createContext, FC, useContext } from 'react';

import { DatePickerContextValue, DatePickerProviderProps } from './types';
import { useDatePicker } from './use-date-picker';

var DatePickerContext = createContext<DatePickerContextValue>(
  {} as DatePickerContextValue,
);

export var useDatePickerContext = () => useContext(DatePickerContext);

export var DatePickerProvider: FC<DatePickerProviderProps> = ({
  children,
  config,
}) => {
  return (
    <DatePickerContext.Provider value={useDatePicker(config)}>
      {children}
    </DatePickerContext.Provider>
  );
};
