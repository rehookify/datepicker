import { NOW, NUMBER_OF_STATIC_CALENDAR_DAYS } from '../constants';
import { Calendar, DatesConfig, LocaleConfig } from '../types';
import {
  formatDate,
  formatDay,
  formatMonth,
  formatMonthName,
  formatYear,
  isAfter,
  isBefore,
  isBetween,
  isSame,
} from './date';

const willBeInRange = (
  day: Date,
  rangeEnd: Date,
  selectedDate: Date,
): boolean => {
  if (isSame(day, rangeEnd)) return true;
  if (isBefore(rangeEnd, selectedDate))
    return isBetween(rangeEnd, day, selectedDate);
  if (isAfter(rangeEnd, selectedDate))
    return isBetween(selectedDate, day, rangeEnd);

  return false;
};

export const createCalendar = (
  calendarDate: Date,
  selectedDates: Date[],
  rangeEnd: Date | null,
  locale: LocaleConfig,
  { mode }: DatesConfig,
): Calendar => {
  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  const firstDayOffset = new Date(year, month, 1).getDay();
  const isRangeMode = mode === 'range';
  const days = [];

  for (let i = 0; i < NUMBER_OF_STATIC_CALENDAR_DAYS; i++) {
    const date = new Date(year, month, i - firstDayOffset + 2);
    days.push({
      $date: date,
      date: formatDate(date, locale),
      day: formatDay(date, locale),
      month: formatMonth(date, locale),
      year: formatYear(date, locale),
      currentDisplayedMonth: date.getMonth() === calendarDate.getMonth(),
      isToday: isSame(NOW, date),
      isSelected: selectedDates.some((d) => isSame(d as Date, date)),
      inRange:
        isRangeMode && selectedDates.length === 2
          ? isBetween(selectedDates[0], date, selectedDates[1])
          : false,
      isRangeStart:
        isRangeMode && selectedDates[0]
          ? isSame(date, selectedDates[0])
          : false,
      isRangeEnd:
        isRangeMode && selectedDates[1]
          ? isSame(date, selectedDates[1])
          : false,
      willBeInRange:
        isRangeMode && rangeEnd
          ? willBeInRange(date, rangeEnd, selectedDates[0])
          : false,
    });
  }

  return {
    year: formatYear(calendarDate, locale),
    month: formatMonthName(calendarDate, locale),
    days,
  };
};
