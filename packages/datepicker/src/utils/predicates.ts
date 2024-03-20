import { getCleanDate, getDateParts } from './date';

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

export const includeDate = (dates: Date[], d: Date): boolean =>
  dates.some((date) => isSame(getCleanDate(date), getCleanDate(d)));

export const isBeforeMinMonth = (month: number, minDate?: Date): boolean =>
  !!minDate && month < getDateParts(minDate).M;

export const isBeforeMinYear = (year: number, minDate?: Date): boolean =>
  !!minDate && year < getDateParts(minDate).Y;

export const isAfterMaxMonth = (month: number, maxDate?: Date): boolean =>
  !!maxDate && month > getDateParts(maxDate).M;

export const isAfterMaxYear = (year: number, maxDate?: Date): boolean =>
  !!maxDate && year > getDateParts(maxDate).Y;

export const isSameOrAfterMaxYear = (year: number, maxDate?: Date): boolean =>
  !!maxDate && year >= getDateParts(maxDate).Y;

export const isSameOrBeforeMinYear = (year: number, minDate?: Date): boolean =>
  !!minDate && year <= getDateParts(minDate).Y;
