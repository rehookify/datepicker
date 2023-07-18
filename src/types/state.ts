import type { Dispatch } from 'react';

import {
  SET_FOCUS_DATE_ACTION,
  SET_OFFSET_DATE_ACTION,
  SET_RANGE_END_ACTION,
  SET_YEAR_ACTION,
} from '../constants';
import { DPConfig } from './config';

export interface DPReducerState {
  focusDate?: Date;
  rangeEnd: Date | null;
  offsetDate: Date;
  offsetYear: number;
}

export interface DPSetFocusDate {
  type: typeof SET_FOCUS_DATE_ACTION;
  date: DPReducerState['focusDate'];
}

export interface DPSetOffsetDate {
  type: typeof SET_OFFSET_DATE_ACTION;
  date: DPReducerState['offsetDate'];
}

export interface DPSetRangeEndAction {
  type: typeof SET_RANGE_END_ACTION;
  date: DPReducerState['rangeEnd'];
}

export interface DPSetYearAction {
  type: typeof SET_YEAR_ACTION;
  year: DPReducerState['offsetYear'];
}

export type DPReducerAction =
  | DPSetFocusDate
  | DPSetOffsetDate
  | DPSetYearAction
  | DPSetRangeEndAction;

export interface DPState {
  dispatch: Dispatch<DPReducerAction>;
  state: DPReducerState;
  selectedDates: Date[];
  offsetDate: Date;
  config: DPConfig;
}
