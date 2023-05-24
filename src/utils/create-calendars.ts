import type {
  DPCalendar,
  DPConfig,
  DPDay,
  DPReducerState,
  DPState,
} from '../types';
import {
  addToDate,
  formatMonthName,
  getCleanDate,
  getDateParts,
  newDate,
  toLocaleDateString,
} from './date';
import { isExcluded } from './excluded';
import { getCalendarMonthParams } from './get-calendar-month-params';
import { getDateRangeState } from './get-date-range-state';
import {
  includeDate,
  isSame,
  maxDateAndAfter,
  minDateAndBefore,
} from './predicates';

const createCalendar = (
  offsetDate: Date,
  selectedDates: Date[],
  { rangeEnd }: DPReducerState,
  config: DPConfig,
): DPCalendar => {
  const {
    dates: { mode, minDate, maxDate },
    locale,
    calendar,
    exclude,
  } = config;
  const { locale: localeStr, day, year } = locale;
  const { M, Y } = getDateParts(offsetDate);
  const { start, length } = getCalendarMonthParams(M, Y, calendar);

  const days: DPDay[] = [];

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

export const createCalendars = ({
  selectedDates,
  state,
  config,
}: DPState): DPCalendar[] => {
  const { offsetDate } = state;
  return config.calendar.offsets.map((offset) =>
    createCalendar(
      addToDate(offsetDate, offset, 'month'),
      selectedDates,
      state,
      config,
    ),
  );
};
