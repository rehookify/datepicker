import { DatePickerConfig } from '../types';
import { getCleanDate, getDateParts } from './date';
import { getCalendarStartDate } from './get-calendar-start-date';
import { getCurrentYearPosition } from './get-current-year-position';

export const createInitialState = (config: DatePickerConfig) => {
  const {
    selectedDates,
    focusDate,
    dates: { minDate, maxDate },
    years,
  } = config;

  const offsetDate =
    selectedDates.length > 0
      ? selectedDates[selectedDates.length - 1]
      : getCalendarStartDate(minDate, maxDate, getCleanDate(new Date()));

  return {
    focusDate,
    rangeEnd: null,
    offsetDate,
    offsetYear: getCurrentYearPosition(getDateParts(offsetDate).Y, years),
    config,
  };
};
