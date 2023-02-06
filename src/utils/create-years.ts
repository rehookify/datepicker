import { CalendarYear, DatesConfig, YearsConfig } from '../types';
import { getDateParts, getFirstDayOfTheMonth, newDate } from './date';
import { maxDateAndAfter, minDateAndBeforeFirstDay } from './predicates';

export const createYears = (
  currentYear: number,
  offsetDate: Date,
  selectedDates: Date[],
  { numberOfYears }: YearsConfig,
  { minDate, maxDate }: DatesConfig,
): CalendarYear[] => {
  const { Y, M, D } = getDateParts(offsetDate);
  const years = [];
  const { Y: nY } = getDateParts(newDate());

  for (let i = 0; i < numberOfYears; i++) {
    const year = currentYear + i;
    const $date = newDate(year, M, D);

    years.push({
      $date,
      active: Y === year,
      disabled:
        minDateAndBeforeFirstDay(minDate, $date) ||
        maxDateAndAfter(maxDate, getFirstDayOfTheMonth($date)),
      now: year === nY,
      selected: selectedDates.some((d) => getDateParts(d).Y === year),
      year,
    });
  }

  return years;
};
