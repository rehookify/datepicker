import { State } from '../state-reducer';
import type {
  Calendar,
  CalendarDay,
  DPDayInteger,
  DPExcludeConfiguration,
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
  includeDate,
  isSame,
  maxDateAndAfter,
  minDateAndBefore,
} from './predicates';

const isExcludedDay = (d: number, eDays?: DPDayInteger[]): boolean =>
  eDays ? eDays.includes(d as DPDayInteger) : false;

const isExcludedDate = (d: Date, dates: Date[] = []): boolean => {
  const { M, D } = getDateParts(d);
  return dates.some((dt: Date) => {
    const { M: md, D: dd } = getDateParts(dt);
    return M === md && D === dd;
  });
};

const isExcluded = (d: Date, { day, date }: DPExcludeConfiguration = {}) => {
  return isExcludedDay(d.getDay(), day) || isExcludedDate(d, date);
};

const createCalendar = (
  offsetDate: Date,
  selectedDates: Date[],
  { rangeEnd, config }: State,
): Calendar => {
  const {
    dates: { mode, minDate, maxDate },
    locale,
    calendar,
    exclude,
  } = config;
  const { locale: localeStr, day, year } = locale;
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
        minDateAndBefore(minDate, date) ||
        maxDateAndAfter(maxDate, date) ||
        isExcluded(date, exclude),
      selected: includeDate(selectedDates, date),
      inCurrentMonth: getDateParts(date).M === M,
    });
  }

  return {
    year: toLocaleDateString(offsetDate, localeStr, { year }),
    month: formatMonthName(offsetDate, locale),
    days,
  };
};

export const createCalendars = (selectedDates: Date[], state: State) => {
  const {
    config: { calendar },
    offsetDate,
  } = state;
  return calendar.offsets.map((offset) =>
    createCalendar(
      addToDate(offsetDate, offset, 'month'),
      selectedDates,
      state,
    ),
  );
};
