import {
  DEFAULT_CALENDAR_CONFIG,
  DEFAULT_YEARS_CONFIG,
  DEFAULT_DATES_CONFIG,
  DEFAULT_LOCALE_CONFIG,
} from '../constants';
import { DatePickerConfig, DatePickerUserConfig } from '../types';
import { getCleanDate, sortDatesAsc } from './date';
import { ensureArray } from './ensure-type';

export const createConfig = ({
  calendar,
  years,
  dates,
  locale,
}: DatePickerUserConfig = {}) => {
  const { minDate, maxDate, selectedDates, ...restDates } = dates || {};
  const { offsets = [], ...restCalendarParams } = calendar || {};
  let min, max;
  if (minDate && maxDate) {
    [min, max] = [minDate, maxDate].sort(sortDatesAsc);
  }

  return {
    calendar: {
      ...DEFAULT_CALENDAR_CONFIG,
      ...restCalendarParams,
      offsets: DEFAULT_CALENDAR_CONFIG.offsets.concat(offsets),
    },
    years: { ...DEFAULT_YEARS_CONFIG, ...years },
    dates: {
      ...DEFAULT_DATES_CONFIG,
      ...restDates,
      minDate: minDate ? getCleanDate(min || minDate) : null,
      maxDate: maxDate ? getCleanDate(max || maxDate) : null,
      selectedDates: ensureArray(selectedDates).map((d) =>
        getCleanDate(d as Date),
      ),
    },
    locale: {
      ...DEFAULT_LOCALE_CONFIG,
      ...locale,
    },
  } as DatePickerConfig;
};
