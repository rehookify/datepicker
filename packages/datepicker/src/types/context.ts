import { ReactNode } from 'react';

import { DPUserConfig } from './config';
import { DPUseDatePicker } from './hooks';

export type DatePickerContextValue = ReturnType<DPUseDatePicker>;

export interface DatePickerProviderProps {
  children: ReactNode;
  config: DPUserConfig;
}
