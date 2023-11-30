import type { DPCalendarConfig } from '../types';
import { daysInMonth, getDay, newDate } from './date';

var NUMBER_OF_STATIC_CALENDAR_DAYS = 42;

function getStartOffset(d: Date, startDay: number): number {
  return (getDay(d) + 7 - startDay) % 7;
}

export function getCalendarMonthParams(
  month: number,
  year: number,
  { mode, startDay }: DPCalendarConfig,
): {
  start: number;
  length: number;
} {
  const firstMonthDay = newDate(year, month, 1);
  const lastDay = daysInMonth(firstMonthDay);

  const startOffset = getStartOffset(firstMonthDay, startDay);

  const length =
    mode === 'static'
      ? NUMBER_OF_STATIC_CALENDAR_DAYS
      : startOffset +
        lastDay +
        6 -
        getStartOffset(newDate(year, month, lastDay), startDay);

  return {
    start: startOffset,
    length,
  };
}
