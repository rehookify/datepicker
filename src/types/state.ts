import type { Dispatch } from 'react';

import {
  SET_FOCUS_DATE_ACTION,
  SET_MAX_DATE_ACTION,
  SET_MIN_DATE_ACTION,
  SET_OFFSET_DATE_ACTION,
  SET_RANGE_END_ACTION,
  SET_YEAR_ACTION,
} from '../constants';
import { DPConfig } from './config';

export interface DPReducerState {
  config: DPConfig;
  focusDate: Date | null;
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

export interface DPSetMinDateAction {
  type: typeof SET_MIN_DATE_ACTION;
  minDate: DPReducerState['config']['dates']['minDate'];
}

export interface DPSetMaxDateAction {
  type: typeof SET_MAX_DATE_ACTION;
  maxDate: DPReducerState['config']['dates']['maxDate'];
}

export type DPReducerAction =
  | DPSetFocusDate
  | DPSetOffsetDate
  | DPSetYearAction
  | DPSetRangeEndAction
  | DPSetMinDateAction
  | DPSetMaxDateAction;

export interface DPState {
  dispatch: Dispatch<DPReducerAction>;
  state: DPReducerState;
  selectedDates: Date[];
}
