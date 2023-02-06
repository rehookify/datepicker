import { NUMBER_OF_MONTHS } from '../constants';
import { CalendarMonth, DatesConfig, LocaleConfig } from '../types';
import {
  formatMonthName,
  getDateParts,
  getFirstDayOfTheMonth,
  newDate,
} from './date';
import { maxDateAndAfter, minDateAndBeforeFirstDay } from './predicates';

export const createMonths = (
  offsetDate: Date,
  selectedDates: Date[],
  locale: LocaleConfig,
  { minDate, maxDate }: DatesConfig,
): CalendarMonth[] => {
  const months = [];
  const { M, Y } = getDateParts(offsetDate);
  const { Y: nY, M: nM } = getDateParts(newDate());

  // Months in Date has values 0 - 11
  for (let i = 0; i < NUMBER_OF_MONTHS; i++) {
    const $date = newDate(Y, i, 1);

    months.push({
      $date,
      month: formatMonthName($date, locale),
      selected: selectedDates.some((d) => {
        const { M: dM, Y: dY } = getDateParts(d);
        return dY === Y && dM === i;
      }),
      active: M === i,
      now: i === nM && Y === nY,
      disabled:
        minDateAndBeforeFirstDay(minDate, $date) ||
        maxDateAndAfter(maxDate, getFirstDayOfTheMonth($date)),
    });
  }

  return months;
};
