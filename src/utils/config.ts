import {
  DEFAULT_CALENDAR_CONFIG,
  DEFAULT_DATES_CONFIG,
  DEFAULT_LOCALE_CONFIG,
  DEFAULT_TIME_CONFIG,
  DEFAULT_YEARS_CONFIG,
} from '../constants';
import type {
  DatePickerConfig,
  DatePickerUserConfig,
  DatesMode,
} from '../types';
import { getCleanDate, sortDatesAsc, sortMinMax } from './date';
import { includeDate } from './predicates';

export const createConfig = ({
  selectedDates = [],
  focusDate = null,
  onDatesChange,
  calendar = {},
  dates = {},
  locale,
  time = {},
  exclude = {},
  years,
}: DatePickerUserConfig = {}): DatePickerConfig => {
  const { minDate, maxDate, ...restDates } = dates;
  const { offsets = [], ...restCalendarParams } = calendar;
  const { minTime, maxTime, ...restTime } = time;

  const [minD, maxD] = sortMinMax(minDate, maxDate, sortDatesAsc);
  const [minT, maxT] = sortMinMax(minTime, maxTime, (a, b) => a.h - b.h);

  const focus =
    focusDate && includeDate(selectedDates, focusDate) ? focusDate : null;

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
      minDate: minD && getCleanDate(minD),
      maxDate: maxD && getCleanDate(maxD),
    },
    locale: {
      ...DEFAULT_LOCALE_CONFIG,
      ...locale,
    },
    time: {
      ...DEFAULT_TIME_CONFIG,
      minTime: minT,
      maxTime: maxT,
      ...restTime,
    },
    exclude,
  };
};

export const isRange = (mode: DatesMode) => mode === 'range';
