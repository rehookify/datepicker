import { getFirstDayOfTheMonth } from './date';

export const isSame = (d1: Date, d2: Date): boolean =>
  d1.toString() === d2.toString();

export const isBefore = (d1: Date, d2: Date): boolean => d1 < d2;

export const isAfter = (d1: Date, d2: Date): boolean => d1 > d2;

export const isBetween = (start: Date, d: Date, end: Date) =>
  (isAfter(d, start) && isBefore(d, end)) ||
  (isBefore(d, start) && isAfter(d, end));

export const maxDateAndAfter = (maxDate: Date | null, date: Date): boolean =>
  !!maxDate && isAfter(date, maxDate);

export const minDateAndBefore = (minDate: Date | null, date: Date): boolean =>
  !!minDate && isBefore(date, minDate);

export const minDateAndBeforeFirstDay = (
  minDate: Date | null,
  date: Date,
): boolean => !!minDate && isBefore(date, getFirstDayOfTheMonth(minDate));
