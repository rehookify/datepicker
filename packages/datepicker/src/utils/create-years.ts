import type { DPDatesConfig, DPYear, DPYearsConfig } from '../types';
import { getDateParts, newDate } from './date';
import { isAfterMaxYear, isBeforeMinYear } from './predicates';

export const createYears = (
  currentYear: number,
  offsetDate: Date,
  selectedDates: Date[],
  { numberOfYears }: DPYearsConfig,
  { minDate, maxDate }: DPDatesConfig,
): DPYear[] => {
  const { Y, M, D } = getDateParts(offsetDate);
  const years = Array(numberOfYears);
  const { Y: nY } = getDateParts(newDate());

  for (let i = 0; i < numberOfYears; i++) {
    const year = currentYear + i;
    const $date = newDate(year, M, D);

    years[i] = {
      $date,
      active: Y === year,
      disabled: isBeforeMinYear(year, minDate) || isAfterMaxYear(year, maxDate),
      now: year === nY,
      selected: selectedDates.some((d) => getDateParts(d).Y === year),
      year,
    };
  }

  return years;
};
