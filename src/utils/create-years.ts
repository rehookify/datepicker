import { CalendarYear, DatesConfig, YearsConfig } from '../types';
import { getDateParts, getFirstDayOfTheMonth } from './date';
import { maxDateAndAfter, minDateAndBeforeFirstDay } from './predicates';

export const createYears = (
  currentYear: number,
  calendarDate: Date,
  selectedDates: Date[],
  { numberOfYears }: YearsConfig,
  { minDate, maxDate }: DatesConfig,
): CalendarYear[] => {
  const { Y, M, D } = getDateParts(calendarDate);
  const years = [];

  for (let i = 0; i < numberOfYears; i++) {
    const value = currentYear + i;
    const date = new Date(value, M, D);

    years.push({
      $date: date,
      value,
      active: Y === value,
      selected: selectedDates.some((d) => getDateParts(d).Y === value),
      disabled:
        minDateAndBeforeFirstDay(minDate, date) ||
        maxDateAndAfter(maxDate, getFirstDayOfTheMonth(date)),
    });
  }

  return years;
};
