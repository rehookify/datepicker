import { NUMBER_OF_MONTHS } from '../constants';
import { LocaleConfig } from '../types';
import { formatMonthName } from './date';

export const createMonths = (
  calendarDate: Date,
  selectedDates: Date[],
  locale: LocaleConfig,
) => {
  const months = [];

  // Months in Date has values 0 - 11
  for (let i = 0; i < NUMBER_OF_MONTHS; i++) {
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
