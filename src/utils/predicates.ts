import { getFirstMonthDay, isAfter, isBefore } from './date';

export const isFunction = (fn: unknown): boolean =>
  !!(fn && typeof fn === 'function');

export const isBoolean = (bool: unknown): boolean =>
  !!(bool && typeof bool === 'boolean');

export const maxDateAndAfter = (maxDate: Date | null, date: Date): boolean =>
  !!maxDate && isAfter(date, maxDate);

export const minDateAndBefore = (minDate: Date | null, date: Date): boolean =>
  !!minDate && isBefore(date, minDate);

export const minDateAndBeforeFirstDay = (
  minDate: Date | null,
  date: Date,
): boolean => !!minDate && isBefore(date, getFirstMonthDay(minDate));
