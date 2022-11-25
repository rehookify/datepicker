import { DAYS_IN_WEEK, NUMBER_OF_STATIC_CALENDAR_DAYS } from '../constants';
import { CalendarMode } from '../types';
import { daysInMonth, getDay } from './date';

export const getCalendarMonthParams = (
  month: number,
  year: number,
  calendarMode: CalendarMode,
) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = daysInMonth(firstDay);

  const numberOfDays =
    calendarMode === 'static'
      ? NUMBER_OF_STATIC_CALENDAR_DAYS
      : getDay(firstDay) +
        lastDay +
        DAYS_IN_WEEK -
        getDay(new Date(year, month, lastDay)) -
        1;

  return {
    startOffset: getDay(firstDay),
    numberOfDays,
  };
};
