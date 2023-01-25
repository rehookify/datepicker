import { NUMBER_OF_MONTHS } from '../constants';
import { CalendarMonth, DatesConfig, LocaleConfig } from '../types';
import { formatMonthName, getDateParts, getFirstDayOfTheMonth } from './date';
import { maxDateAndAfter, minDateAndBeforeFirstDay } from './predicates';

export const createMonths = (
  calendarDate: Date,
  selectedDates: Date[],
  locale: LocaleConfig,
  { minDate, maxDate }: DatesConfig,
): CalendarMonth[] => {
  const months = [];
  const { M, Y } = getDateParts(calendarDate);

  // Months in Date has values 0 - 11
  for (let i = 0; i < NUMBER_OF_MONTHS; i++) {
    const date = new Date(Y, i, 1);

    months.push({
      $date: date,
      name: formatMonthName(date, locale),
      selected: selectedDates.some((d) => {
        const { M: dM, Y: dY } = getDateParts(d);
        return dY === Y && dM === i;
      }),
      active: M === i,
      disabled:
        minDateAndBeforeFirstDay(minDate, date) ||
        maxDateAndAfter(maxDate, getFirstDayOfTheMonth(date)),
    });
  }

  return months;
};
