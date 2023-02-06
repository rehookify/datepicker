import { NUMBER_OF_STATIC_CALENDAR_DAYS } from '../constants';
import { CalendarConfig } from '../types';
import { daysInMonth, getDay, newDate } from './date';

const getStartOffset = (d: Date, startDay: number): number =>
  (getDay(d) + 7 - startDay) % 7;

export const getCalendarMonthParams = (
  month: number,
  year: number,
  { mode, startDay }: CalendarConfig,
) => {
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
};
