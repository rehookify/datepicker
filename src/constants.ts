import {
  CalendarConfig,
  DatesConfig,
  LocaleConfig,
  YearsConfig,
} from './types';
import { getCleanDate } from './utils';

/*
 * It is used for static 🗓 to cover all possible month start and end date combination
 * One month could take 6 rows by 7 days
 * 27 28 29 30 31 01 02
 * 03 04 05 06 07 08 09
 * 10 11 12 13 14 15 16
 * 17 18 19 20 21 22 23
 * 24 25 26 27 28 29 30
 * 31 01 02 03 04 05 06
 */
export const NUMBER_OF_STATIC_CALENDAR_DAYS = 42;

export const DAYS_IN_WEEK = 7;
export const NUMBER_OF_MONTHS = 12;

// Nice to have it statically :)
export const NOW: Date = getCleanDate(new Date());

// Number of yearn by default to mimic number of month
// It will be easy to reuse same layout for years picker
export const NUMBER_OF_YEARS_DISPLAYED = 12;

export const DEFAULT_CALENDAR_CONFIG: CalendarConfig = {
  mode: 'static',
  selectNow: false,
  offsets: [0],
};

export const DEFAULT_YEARS_CONFIG: YearsConfig = {
  numberOfYearsDisplayed: NUMBER_OF_YEARS_DISPLAYED,
  disablePagination: false,
};

export const DEFAULT_DATES_CONFIG: Partial<DatesConfig> = {
  mode: 'single',
  toggle: false,
};

export const DEFAULT_LOCALE_CONFIG: LocaleConfig = {
  locale: 'en-GB',
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  weekday: 'short',
  monthName: 'long',
};
