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
  calendar,
  years,
  dates,
  locale,
}: DatePickerUserConfig = {}) => {
  const { minDate, maxDate, selectedDate, ...restDates } = dates || {};
  const { options, ...restLocaleParams } = locale || {};
  const { offsets = [], ...restCalendarParams } = calendar || {};
  const config = {
    calendar: {
      ...DEFAULT_CALENDAR_CONFIG,
      ...restCalendarParams,
      offsets: DEFAULT_CALENDAR_CONFIG.offsets.concat(offsets),
    },
    years: { ...DEFAULT_YEARS_CONFIG, ...years },
    dates: {
      ...DEFAULT_DATES_CONFIG,
      ...restDates,
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
        ...locale?.options,
      },
    },
  } as DatePickerConfig;

  validateConfig(config);

  return config;
};
