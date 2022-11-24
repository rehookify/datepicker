import { DAYS_IN_WEEK, NUMBER_OF_STATIC_CALENDAR_DAYS } from '../constants';
import { CalendarMode } from '../types';
import { daysInMonth, getUTCDay } from './date';

export const getCalendarMonthParams = (
  month: number,
  year: number,
  calendarMode: CalendarMode,
) => {
  const firstDay = new Date(year, month, 1);
  // getUTCDay here because if the month 1 day is Sunday getDay returns 0 instead of 7
  const lastDay = daysInMonth(firstDay);

  const numberOfDays =
    calendarMode === 'static'
      ? NUMBER_OF_STATIC_CALENDAR_DAYS
      : getUTCDay(firstDay) +
        lastDay +
        DAYS_IN_WEEK -
        getUTCDay(new Date(year, month, lastDay)) -
        1;

  return {
    startOffset: getUTCDay(firstDay),
    numberOfDays,
  };
};
