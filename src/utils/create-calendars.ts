import {
  Calendar,
  CalendarConfig,
  CalendarDay,
  DatesConfig,
  LocaleConfig,
} from '../types';

import {
  addToDate,
  formatDate,
  formatMonthName,
  getCleanDate,
  getDateParts,
  toLocaleDateString,
} from './date';
import { getCalendarMonthParams } from './get-calendar-month-params';
import { getDateRangeState } from './get-date-range-state';
import { isSame, maxDateAndAfter, minDateAndBefore } from './predicates';

const createCalendar = (
  offsetDate: Date,
  selectedDates: Date[],
  rangeEnd: Date | null,
  locale: LocaleConfig,
  { mode, minDate, maxDate }: DatesConfig,
  { mode: calendarMode, startDay }: CalendarConfig,
): Calendar => {
  const { locale: localeStr, day, year: localeYear } = locale;
  const { M, Y } = getDateParts(offsetDate);
  const { startOffset, numberOfDays } = getCalendarMonthParams(
    startDay,
    M,
    Y,
    calendarMode,
  );

  const days: CalendarDay[] = [];

  for (let i = 1; i <= numberOfDays; i++) {
    const date = new Date(Y, M, i - startOffset);

    days.push({
      $date: date,
      day: toLocaleDateString(date, localeStr, { day }),
      now: isSame(getCleanDate(new Date()), date),
      range: getDateRangeState(date, rangeEnd, selectedDates, mode),
      disabled:
        minDateAndBefore(minDate, date) || maxDateAndAfter(maxDate, date),
      selected: selectedDates.some((d) =>
        isSame(getCleanDate(d as Date), date),
      ),
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
  locale: LocaleConfig,
  dates: DatesConfig,
  calendar: CalendarConfig,
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
