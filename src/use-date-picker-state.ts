import { Reducer, useReducer } from 'react';

import { stateReducer } from './state-reducer';
import type {
  DPReducerAction,
  DPReducerState,
  DPState,
  DPUserConfig,
} from './types';
import { createConfig } from './utils/config';
import { createInitialState } from './utils/create-initial-state';

export const useDatePickerState = (config?: DPUserConfig): DPState => {
  const dpConfig = createConfig(config);

  const [state, dispatch] = useReducer<
    Reducer<DPReducerState, DPReducerAction>
  >(stateReducer, createInitialState(dpConfig));

  return {
    dispatch,
    selectedDates: dpConfig.selectedDates,
    state,
  };
};
