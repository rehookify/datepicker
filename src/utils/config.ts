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
  focusDate = null,
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
  let minD, maxD;
  if (minDate && maxDate) {
    [minD, maxD] = [minDate, maxDate].sort(sortDatesAsc);
  }

  let minT, maxT;
  if (minTime && maxTime) {
    [minT, maxT] = [minTime, maxTime].sort((a, b) => a.h - b.h);
  }

  const focus =
    focusDate && selectedDates.includes(focusDate) ? focusDate : null;

  return {
    selectedDates,
    focusDate: focus,
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
      minDate: minDate ? getCleanDate(minD || minDate) : null,
      maxDate: maxDate ? getCleanDate(maxD || maxDate) : null,
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
