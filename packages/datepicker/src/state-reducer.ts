import { Dispatch } from 'react';

import type {
  DPReducerAction,
  DPReducerState,
  DPSetFocusDate,
  DPSetOffsetDate,
  DPSetRangeEndAction,
  DPSetYearAction,
} from './types';

var SET_FOCUS_DATE_ACTION = 'SET_FOCUS_DATE' as const;
var SET_OFFSET_DATE_ACTION = 'SET_OFFSET_DATE' as const;
var SET_RANGE_END_ACTION = 'SET_RANGE_END' as const;
var SET_YEAR_ACTION = 'SET_YEAR' as const;

export function stateReducer(
  state: DPReducerState,
  action: DPReducerAction,
): DPReducerState {
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
    default:
      return state;
  }
}

export function setFocus(
  dispatch: Dispatch<DPSetFocusDate>,
  date: DPReducerState['focusDate'],
): void {
  dispatch({ type: SET_FOCUS_DATE_ACTION, date });
}

export function setOffset(
  dispatch: Dispatch<DPSetOffsetDate>,
  date: Date,
): void {
  dispatch({ type: SET_OFFSET_DATE_ACTION, date });
}

export function setRangeEnd(
  dispatch: Dispatch<DPSetRangeEndAction>,
  date: DPReducerState['rangeEnd'],
): void {
  dispatch({ type: SET_RANGE_END_ACTION, date });
}

export function setYear(
  dispatch: Dispatch<DPSetYearAction>,
  year: number,
): void {
  dispatch({ type: SET_YEAR_ACTION, year });
}
