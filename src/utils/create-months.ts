import { NUMBER_OF_MONTHS } from '../constants';
import { CalendarMonth, DatesConfig, LocaleConfig } from '../types';
import { formatMonthName, getDateParts, getFirstDayOfTheMonth } from './date';
import { maxDateAndAfter, minDateAndBeforeFirstDay } from './predicates';

export const createMonths = (
  offsetDate: Date,
  selectedDates: Date[],
  locale: LocaleConfig,
  { minDate, maxDate }: DatesConfig,
): CalendarMonth[] => {
  const months = [];
  const { M, Y } = getDateParts(offsetDate);

  // Months in Date has values 0 - 11
  for (let i = 0; i < NUMBER_OF_MONTHS; i++) {
    const date = new Date(Y, i, 1);
    const { Y: nY, M: nM } = getDateParts(new Date());

    months.push({
      $date: date,
      month: formatMonthName(date, locale),
      selected: selectedDates.some((d) => {
        const { M: dM, Y: dY } = getDateParts(d);
        return dY === Y && dM === i;
      }),
      active: M === i,
      now: i === nM && Y === nY,
      disabled:
        minDateAndBeforeFirstDay(minDate, date) ||
        maxDateAndAfter(maxDate, getFirstDayOfTheMonth(date)),
    });
  }

  return months;
};
