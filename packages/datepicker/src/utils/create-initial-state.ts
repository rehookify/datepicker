import type { DPConfig, DPReducerState } from '../types';
import { getCleanDate, getDateParts, newDate } from './date';
import { getCalendarStartDate } from './get-calendar-start-date';
import { getCurrentYearPosition } from './get-current-year-position';

export const createInitialState = (config: DPConfig): DPReducerState => {
  const {
    selectedDates,
    offsetDate,
    focusDate,
    dates: { minDate, maxDate },
    years,
  } = config;

  const oDate = offsetDate
    ? offsetDate
    : selectedDates.length > 0
      ? selectedDates[selectedDates.length - 1]
      : getCalendarStartDate(minDate, maxDate, getCleanDate(newDate()));

  return {
    focusDate,
    rangeEnd: null,
    offsetDate: oDate,
    offsetYear: getCurrentYearPosition(getDateParts(oDate).Y, years),
  };
};
