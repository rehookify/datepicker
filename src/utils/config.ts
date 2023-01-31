import {
  DEFAULT_CALENDAR_CONFIG,
  DEFAULT_YEARS_CONFIG,
  DEFAULT_DATES_CONFIG,
  DEFAULT_LOCALE_CONFIG,
  DEFAULT_TIME_CONFIG,
} from '../constants';
import { DatePickerConfig, DatePickerUserConfig, DatesMode } from '../types';
import { getCleanDate, sortDatesAsc } from './date';

export const createConfig = ({
  selectedDates = [],
  onDatesChange,
  calendar,
  years,
  dates,
  locale,
  time,
}: DatePickerUserConfig = {}) => {
  const { minDate, maxDate, ...restDates } = dates || {};
  const { offsets = [], ...restCalendarParams } = calendar || {};
  const { minTime, maxTime, ...restTime } = time || {};
  let min, max;
  if (minDate && maxDate) {
    [min, max] = [minDate, maxDate].sort(sortDatesAsc);
  }

  let minT, maxT;
  if (minTime && maxTime) {
    [minT, maxT] = [minTime, maxTime].sort((a, b) => a.h - b.h);
  }

  return {
    selectedDates,
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
    time: {
      ...DEFAULT_TIME_CONFIG,
      minTime: minT || minTime || null,
      maxTime: maxT || maxTime || null,
      ...restTime,
    },
  } as DatePickerConfig;
};

export const isRange = (mode: DatesMode) => mode === 'range';
