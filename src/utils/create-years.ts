import { CalendarYear, YearsConfig } from '../types';

export const createYears = (
  currentYear: number,
  calendarDate: Date,
  selectedDates: Date[],
  { numberOfYearsDisplayed }: YearsConfig,
): CalendarYear[] => {
  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  const date = calendarDate.getDate();
  const years = [];

  for (let i = 0; i < numberOfYearsDisplayed; i++) {
    const value = currentYear + i;
    years.push({
      $date: new Date(value, month, date),
      value,
      isActive: year === value,
      isSelected: selectedDates.some((d) => d.getFullYear() === value),
    });
  }

  return years;
};
