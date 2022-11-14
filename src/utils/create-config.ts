import { DEFAULT_CALENDAR_CONFIG, DEFAULT_CONFIG_YEARS } from '../constants';
import { DatePickerConfig } from '../types';
import { createDayFromDate } from './create-day-from-date';

export const createConfig = ({
  calendar: calendarParams,
  years: yearsParams,
  minDate: minDateParams,
  maxDate: maxDateParams,
}: DatePickerConfig = {}) => ({
  calendar: { ...DEFAULT_CALENDAR_CONFIG, ...calendarParams },
  years: { ...DEFAULT_CONFIG_YEARS, ...yearsParams },
  minDate: createDayFromDate(minDateParams),
  maxDate: createDayFromDate(maxDateParams),
});
