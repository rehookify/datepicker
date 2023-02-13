import {
  DEFAULT_CALENDAR_CONFIG,
  DEFAULT_DATES_CONFIG,
  DEFAULT_LOCALE_CONFIG,
  DEFAULT_TIME_CONFIG,
  DEFAULT_YEARS_CONFIG,
} from '../constants';
import { DatePickerConfig, DatePickerUserConfig, DatesMode } from '../types';
import { getCleanDate, sortDatesAsc } from './date';

const sortMinMax = <T>(
  min: T | undefined,
  max: T | undefined,
  sortFunction: (a: T, b: T) => number,
): (T | undefined)[] => {
  let [mN, mX] = [min, max];
  if (min && max) {
    [mN, mX] = [min, max].sort(sortFunction);
  }

  return [mN, mX];
};

export const createConfig = ({
  selectedDates = [],
  focusDate = null,
  onDatesChange,
  calendar = {},
  dates = {},
  locale,
  time = {},
  years,
}: DatePickerUserConfig = {}) => {
  const { minDate, maxDate, ...restDates } = dates;
  const { offsets = [], ...restCalendarParams } = calendar;
  const { minTime, maxTime, ...restTime } = time;

  const [minD, maxD] = sortMinMax(minDate, maxDate, sortDatesAsc);
  const [minT, maxT] = sortMinMax(minTime, maxTime, (a, b) => a.h - b.h);

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
      minDate: minD ? getCleanDate(minD) : null,
      maxDate: maxD ? getCleanDate(maxD) : null,
    },
    locale: {
      ...DEFAULT_LOCALE_CONFIG,
      ...locale,
    },
    time: {
      ...DEFAULT_TIME_CONFIG,
      minTime: minT || null,
      maxTime: maxT || null,
      ...restTime,
    },
  } as DatePickerConfig;
};

export const isRange = (mode: DatesMode) => mode === 'range';
