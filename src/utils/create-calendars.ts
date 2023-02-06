import {
  Calendar,
  CalendarConfig,
  CalendarDay,
  DatePickerConfig,
  DatesConfig,
  LocaleConfig,
} from '../types';

import {
  addToDate,
  formatMonthName,
  getCleanDate,
  getDateParts,
  newDate,
  toLocaleDateString,
} from './date';
import { getCalendarMonthParams } from './get-calendar-month-params';
import { getDateRangeState } from './get-date-range-state';
import {
  isSame,
  maxDateAndAfter,
  minDateAndBefore,
  includeDate,
} from './predicates';

const createCalendar = (
  offsetDate: Date,
  selectedDates: Date[],
  rangeEnd: Date | null,
  locale: LocaleConfig,
  { mode, minDate, maxDate }: DatesConfig,
  calendar: CalendarConfig,
): Calendar => {
  const { locale: localeStr, day, year: localeYear } = locale;
  const { M, Y } = getDateParts(offsetDate);
  const { start, length } = getCalendarMonthParams(M, Y, calendar);

  const days: CalendarDay[] = [];

  for (let i = 1; i <= length; i++) {
    const date = newDate(Y, M, i - start);

    days.push({
      $date: date,
      day: toLocaleDateString(date, localeStr, { day }),
      now: isSame(getCleanDate(newDate()), date),
      range: getDateRangeState(date, rangeEnd, selectedDates, mode),
      disabled:
        minDateAndBefore(minDate, date) || maxDateAndAfter(maxDate, date),
      selected: includeDate(selectedDates, date),
      inCurrentMonth: getDateParts(date).M === M,
    });
  }

  return {
    year: toLocaleDateString(offsetDate, localeStr, { year: localeYear }),
    month: formatMonthName(offsetDate, locale),
    days,
  };
};

export const createCalendars = (
  offsetDate: Date,
  selectedDates: Date[],
  rangeEnd: Date | null,
  { locale, dates, calendar }: DatePickerConfig,
) =>
  calendar.offsets.map((offset) =>
    createCalendar(
      addToDate(offsetDate, offset, 'month'),
      selectedDates,
      rangeEnd,
      locale,
      dates,
      calendar,
    ),
  );
