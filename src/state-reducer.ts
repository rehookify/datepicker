import { Dispatch } from 'react';
import { DatePickerConfig } from './types';
import { getDateParts } from './utils/date';
import { getCurrentYearPosition } from './utils/get-current-year-position';
import { getMultipleDates } from './utils/get-multiple-dates';

export interface State {
  rangeEnd: Date | null;
  selectedDates: Date[];
  offsetDate: Date;
  offsetYear: number;
  config: DatePickerConfig;
}

const SELECT_DATE_ACTION = 'SELECT_DATE';
const SET_OFFSET_DATE_ACTION = 'SET_OFFSET_DATE';
const SET_YEAR_ACTION = 'SET_YEAR';
const SET_RANGE_END_ACTION = 'SET_RANGE_END';

interface SelectDateAction {
  type: 'SELECT_DATE';
  date: Date;
}

interface SetOffsetDate {
  type: 'SET_OFFSET_DATE';
  date: State['offsetDate'];
}

interface SetYearAction {
  type: 'SET_YEAR';
  year: State['offsetYear'];
}

interface SetRangeEndAction {
  type: 'SET_RANGE_END';
  date: State['rangeEnd'];
}

export type Action =
  | SelectDateAction
  | SetOffsetDate
  | SetYearAction
  | SetRangeEndAction;

export const stateReducer = (state: State, action: Action) => {
  switch (action.type) {
    case SET_RANGE_END_ACTION:
      return {
        ...state,
        rangeEnd: action.date,
      };
    case SELECT_DATE_ACTION:
      return {
        ...state,
        selectedDates: getMultipleDates(
          state.selectedDates,
          action.date,
          state.config.dates,
        ),
      };
    case SET_YEAR_ACTION:
      return {
        ...state,
        offsetYear: action.year,
      };
    case SET_OFFSET_DATE_ACTION:
      return {
        ...state,
        offsetDate: action.date,
        offsetYear: getCurrentYearPosition(
          getDateParts(action.date).Y,
          state.config.years,
        ),
      };
    default:
      return state;
  }
};

export const selectDates = (dispatch: Dispatch<SelectDateAction>, date: Date) =>
  dispatch({ type: SELECT_DATE_ACTION, date });

export const setOffset = (dispatch: Dispatch<SetOffsetDate>, date: Date) =>
  dispatch({ type: SET_OFFSET_DATE_ACTION, date });

export const setYear = (dispatch: Dispatch<SetYearAction>, year: number) =>
  dispatch({ type: SET_YEAR_ACTION, year });

export const setRangeEnd = (
  dispatch: Dispatch<SetRangeEndAction>,
  date: Date | null,
) => dispatch({ type: SET_RANGE_END_ACTION, date });
