import { DAYS_IN_WEEK, NUMBER_OF_STATIC_CALENDAR_DAYS } from '../constants';
import { CalendarMode } from '../types';
import { daysInMonth } from './date';

export const getCalendarMonthParams = (
  month: number,
  year: number,
  calendarMode: CalendarMode,
) => {
  const firstDay = new Date(year, month, 1);
  // getUTCDay here because if month 1 day is sun it getDay returns 0 instead of 7
  const lastDay = daysInMonth(firstDay);

  const numberOfDaysToDisplay =
    calendarMode === 'static'
      ? NUMBER_OF_STATIC_CALENDAR_DAYS
      : firstDay.getUTCDay() +
        lastDay +
        DAYS_IN_WEEK -
        new Date(year, month, lastDay).getUTCDay() -
        1;

  return {
    firstDayOffset: firstDay.getUTCDay(),
    numberOfDaysToDisplay,
  };
};
