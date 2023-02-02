import { CalendarYear, DatesConfig, YearsConfig } from '../types';
import { getDateParts, getFirstDayOfTheMonth } from './date';
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

  for (let i = 0; i < numberOfYears; i++) {
    const year = currentYear + i;
    const date = new Date(year, M, D);

    years.push({
      active: Y === year,
      $date: date,
      disabled:
        minDateAndBeforeFirstDay(minDate, date) ||
        maxDateAndAfter(maxDate, getFirstDayOfTheMonth(date)),
      now: year === getDateParts(new Date()).Y,
      selected: selectedDates.some((d) => getDateParts(d).Y === year),
      year,
    });
  }

  return years;
};
