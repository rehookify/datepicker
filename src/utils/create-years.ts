import { CalendarYear, DatesConfig, YearsConfig } from '../types';
import { getFirstDayOfTheMonth } from './date';
import { maxDateAndAfter, minDateAndBeforeFirstDay } from './predicates';

export const createYears = (
  currentYear: number,
  calendarDate: Date,
  selectedDates: Date[],
  { numberOfYearsDisplayed }: YearsConfig,
  { minDate, maxDate }: DatesConfig,
): CalendarYear[] => {
  const year = calendarDate.getFullYear();
  const years = [];

  for (let i = 0; i < numberOfYearsDisplayed; i++) {
    const value = currentYear + i;
    const date = new Date(
      value,
      calendarDate.getMonth(),
      calendarDate.getDate(),
    );
    const active = year === value;
    const selected = selectedDates.some((d) => d.getFullYear() === value);
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
