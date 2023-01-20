import {
  DEFAULT_CALENDAR_CONFIG,
  DEFAULT_YEARS_CONFIG,
  DEFAULT_DATES_CONFIG,
  DEFAULT_LOCALE_CONFIG,
} from '../constants';
import { DatePickerConfig, DatePickerUserConfig } from '../types';
import { getCleanDate, sortDatesAsc } from './date';

export const createConfig = ({
  selectedDates = [],
  onDatesChange,
  calendar,
  years,
  dates,
  locale,
}: DatePickerUserConfig = {}) => {
  const { minDate, maxDate, ...restDates } = dates || {};
  const { offsets = [], ...restCalendarParams } = calendar || {};
  let min, max;
  if (minDate && maxDate) {
    [min, max] = [minDate, maxDate].sort(sortDatesAsc);
  }

  return {
    selectedDates: selectedDates.map((d) => getCleanDate(d as Date)),
    onDatesChange,
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
    },
    locale: {
      ...DEFAULT_LOCALE_CONFIG,
      ...locale,
    },
  } as DatePickerConfig;
};
