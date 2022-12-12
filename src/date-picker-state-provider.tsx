import React, {
  createContext,
  useContext,
  FC,
  ReactNode,
  Dispatch,
} from 'react';
import { Action, State } from './state-reducer';
import { DatePickerUserConfig } from './types';
import { useDatePickerState } from './use-date-picker-state';

export interface DatePickerStateProviderProps {
  children: ReactNode;
  config?: DatePickerUserConfig;
}

export interface DatePickerStateProviderValue {
  s: State;
  d: Dispatch<Action>;
}

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
  const [s, d] = useDatePickerState(config);

  return (
    <DatePickerStateContext.Provider value={{ s, d }}>
      {children}
    </DatePickerStateContext.Provider>
  );
};
