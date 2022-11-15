import dayjs from 'dayjs';
import { DEFAULT_CALENDAR_CONFIG, DEFAULT_CONFIG_YEARS } from '../constants';
import { DatePickerUserConfig } from '../types';
import { validateConfig } from './validate-config';

export const createConfig = ({
  calendar: calendarParams,
  years: yearsParams,
  minDate: minDateParams,
  maxDate: maxDateParams,
  selectedDate: selectedDateParams,
}: DatePickerUserConfig = {}) => {
  const config = {
    calendar: { ...DEFAULT_CALENDAR_CONFIG, ...calendarParams },
    years: { ...DEFAULT_CONFIG_YEARS, ...yearsParams },
    minDate: minDateParams ? dayjs(minDateParams) : null,
    maxDate: maxDateParams ? dayjs(maxDateParams) : null,
    selectedDate: selectedDateParams ? dayjs(selectedDateParams) : null,
  };

  validateConfig(config);

  return config;
};
