import { Reducer, useReducer } from 'react';
import { Action, State, stateReducer } from './state-reducer';
import { DatePickerUserConfig } from './types';
import { createConfig } from './utils/config';
import { createInitialState } from './utils/create-initial-state';

export const useDatePickerState = (config?: DatePickerUserConfig) => {
  const dpConfig = createConfig(config);

  const [state, dispatch] = useReducer<Reducer<State, Action>>(
    stateReducer,
    createInitialState(dpConfig),
  );

  return {
    dispatch,
    selectedDates: dpConfig.selectedDates,
    state,
  };
};
