import { CreateCalendarMonth } from '../types';

export const createCalendarMonth: CreateCalendarMonth = (
  day,
  currentDate,
  selectedDates,
  locale,
) => {
  const name = day.toLocaleDateString(locale, { month: 'long' });
  return {
    $day: day,
    name,
    isSelected:
      selectedDates.filter(
        (d) => d.toLocaleDateString(locale, { month: 'long' }) === name,
      ).length > 0,
    isActive:
      currentDate.toLocaleDateString(locale, { month: 'long' }) === name,
  };
};
