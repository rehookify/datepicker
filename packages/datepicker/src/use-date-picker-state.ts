import { useReducer } from 'react';

import { stateReducer } from './state-reducer';
import type { DPState, DPUserConfig } from './types';
import { createConfig } from './utils/config';
import { createInitialState } from './utils/create-initial-state';

export const useDatePickerState = (config: DPUserConfig): DPState => {
  const dpConfig = createConfig(config);

  const [state, dispatch] = useReducer(
    stateReducer,
    createInitialState(dpConfig),
  );

  return {
    dispatch,
    selectedDates: dpConfig.selectedDates,
    offsetDate: dpConfig.offsetDate || state.offsetDate,
    state,
    config: dpConfig,
  };
};
