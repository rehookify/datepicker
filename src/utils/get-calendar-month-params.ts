import { NUMBER_OF_STATIC_CALENDAR_DAYS } from '../constants';
import { CalendarMode } from '../types';
import { daysInMonth, getDay } from './date';

const getStartOffset = (d: Date, startDay: number) =>
  (getDay(d) + 7 - startDay) % 7;

export const getCalendarMonthParams = (
  startDay: number,
  month: number,
  year: number,
  calendarMode: CalendarMode,
) => {
  const firstMonthDay = new Date(year, month, 1);
  const lastDay = daysInMonth(firstMonthDay);

  const startOffset = getStartOffset(firstMonthDay, startDay);

  const numberOfDays =
    calendarMode === 'static'
      ? NUMBER_OF_STATIC_CALENDAR_DAYS
      : startOffset +
        lastDay +
        6 -
        getStartOffset(new Date(year, month, lastDay), startDay);

  return {
    startOffset,
    numberOfDays,
  };
};
