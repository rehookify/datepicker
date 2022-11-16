import { CalendarMonth, LocaleConfig } from '../types';
import { formatMonthName } from './date';

export const createMonths = (
  calendarDate: Date,
  selectedDates: Date[],
  locale: LocaleConfig,
): CalendarMonth[] => {
  const months = [];

  // Months in Date starts has values 0 - 11
  for (let i = 0; i < 12; i++) {
    const date = new Date(calendarDate.getFullYear(), i, 1);
    const name = formatMonthName(date, locale);
    months.push({
      $date: date,
      name,
      isSelected: selectedDates.some(
        (d) => formatMonthName(d, locale) === name,
      ),
      isActive: formatMonthName(calendarDate, locale) === name,
    });
  }

  return months;
};
