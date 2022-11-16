import {
  DEFAULT_CALENDAR_CONFIG,
  DEFAULT_YEARS_CONFIG,
  DEFAULT_DATES_CONFIG,
} from '../constants';
import { DatePickerConfig, DatePickerUserConfig } from '../types';
import { getCleanDate } from './date';
import { ensureArray } from './ensure-type';
import { validateConfig } from './validate-config';

export const createConfig = ({
  calendar: calendarParams,
  years: yearsParams,
  dates: datesParams,
}: DatePickerUserConfig = {}) => {
  const config = {
    calendar: { ...DEFAULT_CALENDAR_CONFIG, ...calendarParams },
    years: { ...DEFAULT_YEARS_CONFIG, ...yearsParams },
    dates: {
      ...DEFAULT_DATES_CONFIG,
      minDate: datesParams?.minDate ? getCleanDate(datesParams?.minDate) : null,
      maxDate: datesParams?.maxDate ? getCleanDate(datesParams?.maxDate) : null,
      selectedDates: ensureArray(datesParams?.selectedDate).map((d) =>
        getCleanDate(d as Date),
      ),
    },
  } as DatePickerConfig;

  validateConfig(config);

  return config;
};
