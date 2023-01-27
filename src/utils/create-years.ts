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
    const value = currentYear + i;
    const date = new Date(value, M, D);

    years.push({
      active: Y === value,
      $date: date,
      disabled:
        minDateAndBeforeFirstDay(minDate, date) ||
        maxDateAndAfter(maxDate, getFirstDayOfTheMonth(date)),
      now: value === getDateParts(new Date()).Y,
      selected: selectedDates.some((d) => getDateParts(d).Y === value),
      value,
    });
  }

  return years;
};
