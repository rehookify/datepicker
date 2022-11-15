import { NOW } from '../constants';
import { DatePickerConfig } from '../types';

export const getCalendarDate = ({ maxDate, minDate }: DatePickerConfig) => {
  if (maxDate && NOW.isAfter(maxDate)) return maxDate;

  if (minDate && NOW.isBefore(minDate)) return minDate;

  return NOW;
};
