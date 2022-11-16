import { DatePart } from '../types';

/*
 * We need this function to eliminate time from the comparison.
 * All date that comes to DP should go through this function.
 */
export const getCleanDate = (d: Date): Date =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate());

export const isSame = (d1: Date, d2: Date): boolean =>
  d1.toString() === d2.toString();

export const isBefore = (d1: Date, d2: Date): boolean => d1 < d2;

export const isAfter = (d1: Date, d2: Date): boolean => d1 > d2;

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
