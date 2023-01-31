import { DatePart, LocaleConfig, TimeLimit } from '../types';

export const getDateParts = (d: Date) => ({
  D: d.getDate(),
  M: d.getMonth(),
  Y: d.getFullYear(),
});

// Days in order sun = 0 ... sat = 6
export const getDay = (d: Date) => d.getDay();

/*
 * We need this function to eliminate time from the comparison.
 * All date that comes to DP should go through this function.
 */
export const getCleanDate = (d: Date): Date =>
  new Date(getDateParts(d).Y, getDateParts(d).M, getDateParts(d).D);

export const daysInMonth = (d: Date): number =>
  new Date(getDateParts(d).Y, getDateParts(d).M + 1, 0).getDate();

export const getFirstDayOfTheMonth = (d: Date): Date =>
  new Date(getDateParts(d).Y, getDateParts(d).M, 1);

export const addToDate = (d: Date, value: number, part: DatePart) =>
  new Date(
    getDateParts(d).Y + (part === 'year' ? value : 0),
    getDateParts(d).M + (part === 'month' ? value : 0),
    getDateParts(d).D + (part === 'date' ? value : 0),
  );

export const subtractFromDate = (d: Date, value: number, part: DatePart) =>
  addToDate(d, 0 - value, part);

export const sortDatesAsc = (a: Date, b: Date) => a.getTime() - b.getTime();

export const toLocaleDateString = (
  d: Date,
  locale?: Intl.LocalesArgument,
  options?: Intl.DateTimeFormatOptions,
) => d.toLocaleDateString(locale, options);

export const formatMonthName = (d: Date, { locale, monthName }: LocaleConfig) =>
  toLocaleDateString(d, locale, { month: monthName });

export const formatDate = (d: Date, { locale, options }: LocaleConfig) =>
  toLocaleDateString(d, locale, options);

export const getTimeDate = (
  Y: number,
  M: number,
  D: number,
  t?: TimeLimit,
): Date | null =>
  t && t.h != null && t.m != null ? new Date(Y, M, D, t.h, t.m) : null;
