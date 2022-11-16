import {
  DEFAULT_CALENDAR_CONFIG,
  DEFAULT_YEARS_CONFIG,
  DEFAULT_DATES_CONFIG,
  DEFAULT_LOCALE_CONFIG,
} from '../constants';
import { DatePickerConfig, DatePickerUserConfig } from '../types';
import { getCleanDate } from './date';
import { ensureArray } from './ensure-type';
import { validateConfig } from './validate-config';

export const createConfig = ({
  calendar: calendarParams,
  years: yearsParams,
  dates: datesParams,
  locale: localeParams,
}: DatePickerUserConfig = {}) => {
  const { minDate, maxDate, selectedDate, ...restDatesParams } =
    datesParams || {};
  const { options, ...restLocaleParams } = localeParams || {};
  const config = {
    calendar: { ...DEFAULT_CALENDAR_CONFIG, ...calendarParams },
    years: { ...DEFAULT_YEARS_CONFIG, ...yearsParams },
    dates: {
      ...DEFAULT_DATES_CONFIG,
      ...restDatesParams,
      minDate: minDate ? getCleanDate(minDate) : null,
      maxDate: maxDate ? getCleanDate(maxDate) : null,
      selectedDates: ensureArray(selectedDate).map((d) =>
        getCleanDate(d as Date),
      ),
    },
    locale: {
      ...DEFAULT_LOCALE_CONFIG,
      ...restLocaleParams,
      options: {
        ...DEFAULT_LOCALE_CONFIG.options,
        ...localeParams?.options,
      },
    },
  } as DatePickerConfig;

  validateConfig(config);

  return config;
};
