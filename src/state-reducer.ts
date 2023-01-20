import { Dispatch } from 'react';
import { DatePickerConfig } from './types';
import { getDateParts } from './utils/date';
import { getCurrentYearPosition } from './utils/get-current-year-position';

export interface State {
  rangeEnd: Date | null;
  offsetDate: Date;
  offsetYear: number;
  config: DatePickerConfig;
}

const SET_OFFSET_DATE_ACTION = 'SET_OFFSET_DATE';
const SET_YEAR_ACTION = 'SET_YEAR';
const SET_RANGE_END_ACTION = 'SET_RANGE_END';
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

export type Action = SetOffsetDate | SetYearAction | SetRangeEndAction;

export const stateReducer = (state: State, action: Action) => {
  switch (action.type) {
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

export const setOffset = (dispatch: Dispatch<SetOffsetDate>, date: Date) =>
  dispatch({ type: SET_OFFSET_DATE_ACTION, date });

export const setYear = (dispatch: Dispatch<SetYearAction>, year: number) =>
  dispatch({ type: SET_YEAR_ACTION, year });

export const setRangeEnd = (
  dispatch: Dispatch<SetRangeEndAction>,
  date: Date | null,
) => dispatch({ type: SET_RANGE_END_ACTION, date });
