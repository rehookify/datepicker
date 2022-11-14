import { CreateCalendarYear } from '../types';

export const createCalendarYear: CreateCalendarYear = (
  offset,
  currentYear,
  currentDate,
) => {
  const yearValue = currentYear + offset;
  return {
    $day: currentDate.year(yearValue),
    value: yearValue,
    isSelected: Number(currentDate.format('YYYY')) === yearValue,
  };
};
