import { CreateCalendarMonth } from '../types';

export const createCalendarMonth: CreateCalendarMonth = (
  day,
  currentDate,
  selectedDates,
  { locale, monthName },
) => {
  const options = { month: monthName };
  const name = day.toLocaleDateString(locale, options);
  return {
    $day: day,
    name,
    isSelected:
      selectedDates.filter(
        (d) => d.toLocaleDateString(locale, options) === name,
      ).length > 0,
    isActive: currentDate.toLocaleDateString(locale, options) === name,
  };
};
