import { CreateCalendarYear } from '../types';

export const createCalendarYear: CreateCalendarYear = (
  offset,
  currentYear,
  currentDate,
  selectedDates,
) => {
  const yearValue = currentYear + offset;
  return {
    $day: new Date(yearValue, currentDate.getMonth(), currentDate.getDate()),
    value: yearValue,
    isActive: currentDate.getFullYear() === yearValue,
    isSelected:
      selectedDates.filter((d) => d.getFullYear() === yearValue).length > 0,
  };
};
