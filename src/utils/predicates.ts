import { getCleanDate, getFirstDayOfTheMonth } from './date';

// Converting Date to Number is equal of calling Date.getTime
export const isSame = (d1: Date, d2: Date): boolean => +d1 === +d2;

export const isBefore = (d1: Date, d2: Date): boolean => d1 < d2;

export const isAfter = (d1: Date, d2: Date): boolean => d1 > d2;

export const isBetween = (start: Date, d: Date, end: Date): boolean =>
  (isAfter(d, start) && isBefore(d, end)) ||
  (isBefore(d, start) && isAfter(d, end));

export const maxDateAndAfter = (
  maxDate: Date | undefined,
  date: Date,
): boolean => !!maxDate && isAfter(date, maxDate);

export const minDateAndBefore = (
  minDate: Date | undefined,
  date: Date,
): boolean => !!minDate && isBefore(date, minDate);

export const minDateAndBeforeFirstDay = (
  minDate: Date | undefined,
  date: Date,
): boolean => !!minDate && isBefore(date, getFirstDayOfTheMonth(minDate));

export const includeDate = (dates: Date[], d: Date): boolean =>
  dates.some((date) => isSame(getCleanDate(date), d));
