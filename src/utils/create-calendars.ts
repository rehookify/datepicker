import { DAYS_IN_WEEK, NUMBER_OF_STATIC_CALENDAR_DAYS } from '../constants';
import {
  CalendarConfig,
  CalendarMode,
  DatesConfig,
  DayRange,
  LocaleConfig,
} from '../types';
import { addToDate, daysInMonth, formatDate, formatMonthName } from './date';
import {
  isBefore,
  isBetween,
  isSame,
  maxDateAndAfter,
  minDateAndBefore,
} from './predicates';

const detectRange = (
  date: Date,
  rangeEnd: Date | null,
  selectedDates: Date[],
) => {
  // We have completed range
  if (selectedDates.length === 2) {
    if (isSame(date, selectedDates[0])) return 'range-start';
    if (isSame(date, selectedDates[1])) return 'range-end';
    if (isBetween(selectedDates[0], date, selectedDates[1])) return 'in-range';
    return '';
  }

  // We have 1 date and rangeEnd date
  if (selectedDates.length === 1 && rangeEnd) {
    if (isBetween(selectedDates[0], date, rangeEnd)) return 'will-be-in-range';
    // rangeEnd is before selectedDates[0]
    if (isBefore(rangeEnd, selectedDates[0])) {
      if (isSame(date, rangeEnd)) return 'will-be-range-start';
      if (isSame(date, selectedDates[0])) return 'will-be-range-end';
      return '';
    }

    // rangeEnd is after selectedDates[0];
    if (isSame(date, selectedDates[0])) return 'will-be-range-start';
    if (isSame(date, rangeEnd)) return 'will-be-range-end';
    return '';
  }

  return '';
};

const getNumberOfDays = (
  month: number,
  year: number,
  date: Date,
  calendarMode: CalendarMode,
  firstDayOffset: number,
): number => {
  if (calendarMode === 'static') return NUMBER_OF_STATIC_CALENDAR_DAYS;

  const days = daysInMonth(date);
  const lastDayOffset = new Date(year, month, days).getUTCDay();

  return firstDayOffset + days + DAYS_IN_WEEK - lastDayOffset - 1;
};

const getMonthParams = (
  month: number,
  year: number,
  calendarMode: CalendarMode,
) => {
  const firstDay = new Date(year, month, 1);
  // getUTCDay here because if month 1 day is sun it getDay returns 0 instead of 7
  const firstDayOffset = firstDay.getUTCDay();

  return {
    firstDayOffset,
    numberOfDaysToDisplay: getNumberOfDays(
      month,
      year,
      firstDay,
      calendarMode,
      firstDayOffset,
    ),
  };
};

const createCalendar = (
  calendarDate: Date,
  selectedDates: Date[],
  rangeEnd: Date | null,
  NOW: Date,
  locale: LocaleConfig,
  { mode, minDate, maxDate }: DatesConfig,
  calendarMode: CalendarMode,
) => {
  const { locale: localeStr, day, year: localeYear } = locale;
  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  const { firstDayOffset, numberOfDaysToDisplay } = getMonthParams(
    month,
    year,
    calendarMode,
  );
  const isRangeMode = mode === 'range';
  const days = [];

  for (let i = 1; i <= numberOfDaysToDisplay; i++) {
    const date = new Date(year, month, i - firstDayOffset);
    const range: DayRange = isRangeMode
      ? detectRange(date, rangeEnd, selectedDates)
      : '';
    const disabled =
      minDateAndBefore(minDate, date) || maxDateAndAfter(maxDate, date);
    const selected = selectedDates.some((d) => isSame(d as Date, date));
    const inCurrentMonth = date.getMonth() === month;

    days.push({
      $date: date,
      date: formatDate(date, locale),
      day: date.toLocaleDateString(localeStr, { day }),
      currentDisplayedMonth: inCurrentMonth,
      isToday: isSame(NOW, date),
      isSelected: selected,
      inRange: range === 'in-range',
      isRangeStart: range === 'range-start',
      isRangeEnd: range === 'range-end',
      willBeInRange: [
        'will-be-in-range',
        'will-be-range-start',
        'will-be-range-end',
      ].includes(range),
      range,
      disabled,
      selected,
      inCurrentMonth,
    });
  }

  return {
    year: calendarDate.toLocaleDateString(localeStr, { year: localeYear }),
    month: formatMonthName(calendarDate, locale),
    days,
  };
};

export const createCalendars = (
  calendarDate: Date,
  selectedDates: Date[],
  rangeEnd: Date | null,
  NOW: Date,
  locale: LocaleConfig,
  dates: DatesConfig,
  { mode, offsets }: CalendarConfig,
) => {
  return offsets.map((offset) =>
    createCalendar(
      addToDate(calendarDate, offset, 'month'),
      selectedDates,
      rangeEnd,
      NOW,
      locale,
      dates,
      mode,
    ),
  );
};
