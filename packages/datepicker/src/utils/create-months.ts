import type { DPDatesConfig, DPLocaleConfig, DPMonth } from '../types';
import { daysInMonth, formatMonthName, getDateParts, newDate } from './date';
import {
  isAfterMaxMonth,
  isBeforeMinMonth,
  isSameOrAfterMaxYear,
  isSameOrBeforeMinYear,
} from './predicates';

export var createMonths = (
  offsetDate: Date,
  selectedDates: Date[],
  locale: DPLocaleConfig,
  { minDate, maxDate }: DPDatesConfig,
): DPMonth[] => {
  const { M, Y, D } = getDateParts(offsetDate);
  const { Y: nY, M: nM } = getDateParts(newDate());

  // 12 is a number of months in the year
  return Array(12)
    .fill(0)
    .map((_, i) => {
      // Prevent situation when previous month has less days than current March -> February
      const maxMonthDate = daysInMonth(newDate(Y, i, 1));
      const $date = newDate(Y, i, D > maxMonthDate ? maxMonthDate : D);

      return {
        $date,
        month: formatMonthName($date, locale),
        selected: selectedDates.some((d) => {
          const { M: dM, Y: dY } = getDateParts(d);
          return dY === Y && dM === i;
        }),
        active: M === i,
        now: i === nM && Y === nY,
        disabled:
          (isBeforeMinMonth(i, minDate) && isSameOrBeforeMinYear(Y, minDate)) ||
          (isAfterMaxMonth(i, maxDate) && isSameOrAfterMaxYear(Y, maxDate)),
      };
    });
};
