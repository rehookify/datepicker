import { Dispatch } from 'react';

import {
  SET_FOCUS_DATE_ACTION,
  SET_MAX_DATE_ACTION,
  SET_MIN_DATE_ACTION,
  SET_OFFSET_DATE_ACTION,
  SET_RANGE_END_ACTION,
  SET_YEAR_ACTION,
} from './constants';
import type {
  DPReducerAction,
  DPReducerState,
  DPSetFocusDate,
  DPSetMaxDateAction,
  DPSetMinDateAction,
  DPSetOffsetDate,
  DPSetRangeEndAction,
  DPSetYearAction,
} from './types';

export const stateReducer = (
  state: DPReducerState,
  action: DPReducerAction,
): DPReducerState => {
  switch (action.type) {
    case SET_FOCUS_DATE_ACTION:
      return {
        ...state,
        focusDate: action.date,
      };
    case SET_OFFSET_DATE_ACTION:
      return {
        ...state,
        offsetDate: action.date,
      };
    case SET_RANGE_END_ACTION:
      return {
        ...state,
        rangeEnd: action.date,
      };
    case SET_YEAR_ACTION:
      return {
        ...state,
        offsetYear: action.year,
      };
    case SET_MIN_DATE_ACTION:
      return {
        ...state,
        config: {
          ...state.config,
          dates: {
            ...state.config.dates,
            minDate: action.minDate,
          },
        },
      };
    case SET_MAX_DATE_ACTION:
      return {
        ...state,
        config: {
          ...state.config,
          dates: {
            ...state.config.dates,
            maxDate: action.maxDate,
          },
        },
      };
    default:
      return state;
  }
};

export const setFocus = (
  dispatch: Dispatch<DPSetFocusDate>,
  date: DPReducerState['focusDate'],
): void => dispatch({ type: SET_FOCUS_DATE_ACTION, date });

export const setOffset = (
  dispatch: Dispatch<DPSetOffsetDate>,
  date: Date,
): void => dispatch({ type: SET_OFFSET_DATE_ACTION, date });

export const setRangeEnd = (
  dispatch: Dispatch<DPSetRangeEndAction>,
  date: DPReducerState['rangeEnd'],
): void => dispatch({ type: SET_RANGE_END_ACTION, date });

export const setYear = (
  dispatch: Dispatch<DPSetYearAction>,
  year: number,
): void => dispatch({ type: SET_YEAR_ACTION, year });

export const setMinDate = (
  dispatch: Dispatch<DPSetMinDateAction>,
  minDate: Date,
): void => dispatch({ type: SET_MIN_DATE_ACTION, minDate });

export const setMaxDate = (
  dispatch: Dispatch<DPSetMaxDateAction>,
  maxDate: Date,
): void => dispatch({ type: SET_MAX_DATE_ACTION, maxDate });
