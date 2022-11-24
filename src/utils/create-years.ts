import { CalendarYear, DatesConfig, YearsConfig } from '../types';
import { getDateParts, getFirstDayOfTheMonth } from './date';
import { maxDateAndAfter, minDateAndBeforeFirstDay } from './predicates';

export const createYears = (
  currentYear: number,
  calendarDate: Date,
  selectedDates: Date[],
  { numberOfYearsDisplayed }: YearsConfig,
  { minDate, maxDate }: DatesConfig,
): CalendarYear[] => {
  const { Y, M, D } = getDateParts(calendarDate);
  const years = [];

  for (let i = 0; i < numberOfYearsDisplayed; i++) {
    const value = currentYear + i;
    const date = new Date(value, M, D);
    const active = Y === value;
    const selected = selectedDates.some((d) => getDateParts(d).Y === value);
    const disabled =
      minDateAndBeforeFirstDay(minDate, date) ||
      maxDateAndAfter(maxDate, getFirstDayOfTheMonth(date));
    years.push({
      $date: date,
      value,
      isActive: active,
      isSelected: selected,
      active,
      selected,
      disabled,
    });
  }

  return years;
};
