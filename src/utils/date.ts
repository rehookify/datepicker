import type { DatePart, LocaleConfig, TimeLimit } from '../types';

// Year and Month is a minimum required arguments for creating a date
// == null is intentional to check also for undefined
export const newDate = (Y?: number, M?: number, ...rest: number[]) =>
  !Y || M == null ? new Date() : new Date(Y, M, ...rest);

interface DateParts {
  D: number;
  M: number;
  Y: number;
}

export const getDateParts = (d: Date): DateParts => ({
  D: d.getDate(),
  M: d.getMonth(),
  Y: d.getFullYear(),
});

// Days in order sun = 0 ... sat = 6
export const getDay = (d: Date): number => d.getDay();

/*
 * We need this function to eliminate time from the comparison.
 * All date that comes to DP should go through this function.
 */
export const getCleanDate = (d: Date): Date =>
  newDate(getDateParts(d).Y, getDateParts(d).M, getDateParts(d).D);

export const daysInMonth = (d: Date): number =>
  newDate(getDateParts(d).Y, getDateParts(d).M + 1, 0).getDate();

export const getFirstDayOfTheMonth = (d: Date): Date =>
  newDate(getDateParts(d).Y, getDateParts(d).M, 1);

export const addToDate = (d: Date, value: number, part: DatePart): Date => {
  const { Y, M, D } = getDateParts(d);
  // Cover case when offsetDate is 31 and next month doesn't have 31 days
  // More details here https://github.com/rehookify/datepicker/issues/10
  const nextDate =
    part === 'date'
      ? D + value
      : part === 'month' && D > daysInMonth(newDate(Y, M + value, 1))
      ? daysInMonth(newDate(Y, M + value, 1))
      : D;

  return newDate(
    Y + (part === 'year' ? value : 0),
    M + (part === 'month' ? value : 0),
    nextDate,
  );
};

export const subtractFromDate = (
  d: Date,
  value: number,
  part: DatePart,
): Date => addToDate(d, 0 - value, part);

export const sortDatesAsc = (a: Date, b: Date): number => +a - +b;

export const toLocaleDateString = (
  d: Date,
  locale?: Intl.LocalesArgument,
  options?: Intl.DateTimeFormatOptions,
): string => d.toLocaleDateString(locale, options);

export const formatMonthName = (
  d: Date,
  { locale, monthName }: LocaleConfig,
): string => toLocaleDateString(d, locale, { month: monthName });

export const formatDate = (
  d: Date,
  { locale, options }: LocaleConfig,
): string => toLocaleDateString(d, locale, options);

export const getTimeDate = (
  Y: number,
  M: number,
  D: number,
  t?: TimeLimit,
): Date | undefined =>
  t && t.h != null && t.m != null ? newDate(Y, M, D, t.h, t.m) : undefined;

export const formatTime = (
  d: Date,
  { locale, hour, minute, second, hour12 }: LocaleConfig,
): string =>
  d.toLocaleTimeString(locale, {
    hour,
    minute,
    second,
    hour12,
  });

export const addAndSortAsc = (dates: Date[], d: Date) =>
  dates.concat(d).sort(sortDatesAsc);

export const sortMinMax = <T>(
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
