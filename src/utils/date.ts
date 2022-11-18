import { DatePart, LocaleConfig } from '../types';

/*
 * We need this function to eliminate time from the comparison.
 * All date that comes to DP should go through this function.
 */
export const getCleanDate = (d: Date): Date =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate());

export const daysInMonth = (d: Date): number =>
  new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();

export const getFirstMonthDay = (d: Date): Date =>
  new Date(d.getFullYear(), d.getMonth(), 1);

export const addToDate = (d: Date, value: number, part: DatePart) =>
  new Date(
    d.getFullYear() + (part === 'year' ? value : 0),
    d.getMonth() + (part === 'month' ? value : 0),
    d.getDate() + (part === 'date' ? value : 0),
  );

export const subtractFromDate = (d: Date, value: number, part: DatePart) =>
  addToDate(d, 0 - value, part);

export const sortDatesAsc = (a: Date, b: Date) => a.getTime() - b.getTime();

// Format date
export const formatMonthName = (d: Date, { locale, monthName }: LocaleConfig) =>
  d.toLocaleDateString(locale, { month: monthName });

export const formatDate = (d: Date, { locale, options }: LocaleConfig) =>
  d.toLocaleDateString(locale, options);
