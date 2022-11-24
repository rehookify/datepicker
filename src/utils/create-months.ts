import { NUMBER_OF_MONTHS } from '../constants';
import { DatesConfig, LocaleConfig } from '../types';
import { formatMonthName, getFirstDayOfTheMonth } from './date';
import { maxDateAndAfter, minDateAndBeforeFirstDay } from './predicates';

export const createMonths = (
  calendarDate: Date,
  selectedDates: Date[],
  locale: LocaleConfig,
  { minDate, maxDate }: DatesConfig,
) => {
  const months = [];

  // Months in Date has values 0 - 11
  for (let i = 0; i < NUMBER_OF_MONTHS; i++) {
    const date = new Date(calendarDate.getFullYear(), i, 1);
    const disabled =
      minDateAndBeforeFirstDay(minDate, date) ||
      maxDateAndAfter(maxDate, getFirstDayOfTheMonth(date));
    const selected = selectedDates.some(
      (d) => d.getMonth() === date.getMonth(),
    );
    const active = calendarDate.getMonth() === date.getMonth();

    months.push({
      $date: date,
      name: formatMonthName(date, locale),
      selected,
      isSelected: selected,
      isActive: active,
      active,
      disabled,
    });
  }

  return months;
};
