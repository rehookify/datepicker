import { NOW } from '../constants';
import { DatePickerConfig } from '../types';
import { getDateParts } from './date';
import { getCalendarStartDate } from './get-calendar-start-date';
import { getCurrentYearPosition } from './get-current-year-position';

export const createInitialState = (config: DatePickerConfig) => {
  const {
    dates: { selectedDates, minDate, maxDate },
    years,
  } = config;

  const offsetDate =
    selectedDates.length > 0
      ? selectedDates[selectedDates.length - 1]
      : getCalendarStartDate(minDate, maxDate, NOW);

  return {
    rangeEnd: null,
    selectedDates,
    offsetDate,
    offsetYear: getCurrentYearPosition(getDateParts(offsetDate).Y, years),
    config,
  };
};
