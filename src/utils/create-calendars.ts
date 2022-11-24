import {
  CalendarConfig,
  CalendarMode,
  DatesConfig,
  DayRange,
  LocaleConfig,
} from '../types';

import {
  addToDate,
  formatDate,
  formatMonthName,
  getDateParts,
  toLocaleDateString,
} from './date';
import { getCalendarMonthParams } from './get-calendar-month-params';
import { getDateRangeState } from './get-date-range-state';
import { isSame, maxDateAndAfter, minDateAndBefore } from './predicates';

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
  const { M, Y } = getDateParts(calendarDate);
  const { startOffset, numberOfDays } = getCalendarMonthParams(
    M,
    Y,
    calendarMode,
  );

  const days = [];

  for (let i = 1; i <= numberOfDays; i++) {
    const date = new Date(Y, M, i - startOffset);
    const range: DayRange =
      mode === 'range' ? getDateRangeState(date, rangeEnd, selectedDates) : '';
    const disabled =
      minDateAndBefore(minDate, date) || maxDateAndAfter(maxDate, date);
    const selected = selectedDates.some((d) => isSame(d as Date, date));
    const inCurrentMonth = getDateParts(date).M === M;

    days.push({
      $date: date,
      date: formatDate(date, locale),
      day: toLocaleDateString(date, localeStr, { day }),
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
    year: toLocaleDateString(calendarDate, localeStr, { year: localeYear }),
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
) =>
  offsets.map((offset) =>
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
