import type { DPDatesConfig, DPLocaleConfig, DPMonth } from '../types';
import { formatMonthName, getDateParts, newDate } from './date';
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
  // 12 is a number of months in the year
  const { M, Y } = getDateParts(offsetDate);
  const { Y: nY, M: nM } = getDateParts(newDate());

  return Array(12)
    .fill(0)
    .map((_, i) => {
      const $date = newDate(Y, i, 1);

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
