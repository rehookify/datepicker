import type { DPDayInteger, DPExcludeConfig } from '../types';
import { getDateParts } from './date';

export const isExcludedDay = (d: number, eDays?: DPDayInteger[]): boolean =>
  eDays ? eDays.includes(d as DPDayInteger) : false;

export const isExcludedDate = (d: Date, dates: Date[] = []): boolean => {
  const { M, D } = getDateParts(d);
  return dates.some((date: Date) => {
    const { M: md, D: dd } = getDateParts(date);
    return M === md && D === dd;
  });
};

export const isExcluded = (
  d: Date,
  { day, date }: DPExcludeConfig = {},
): boolean => isExcludedDay(d.getDay(), day) || isExcludedDate(d, date);
