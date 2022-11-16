import { NOW } from '../constants';
import { DatePickerConfig } from '../types';
import { isAfter, isBefore } from './date';

export const getCalendarDate = ({ dates }: DatePickerConfig) => {
  if (dates.maxDate && isAfter(NOW, dates.maxDate)) return dates.maxDate;

  if (dates.minDate && isBefore(NOW, dates.minDate)) return dates.minDate;

  return NOW;
};
