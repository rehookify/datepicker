import { NUMBER_OF_MONTHS } from '../constants';
import { DatesConfig, LocaleConfig } from '../types';
import { formatMonthName, getDateParts, getFirstDayOfTheMonth } from './date';
import { maxDateAndAfter, minDateAndBeforeFirstDay } from './predicates';

export const createMonths = (
  calendarDate: Date,
  selectedDates: Date[],
  locale: LocaleConfig,
  { minDate, maxDate }: DatesConfig,
) => {
  const months = [];
  const { M, Y } = getDateParts(calendarDate);

  // Months in Date has values 0 - 11
  for (let i = 0; i < NUMBER_OF_MONTHS; i++) {
    const date = new Date(Y, i, 1);
    const disabled =
      minDateAndBeforeFirstDay(minDate, date) ||
      maxDateAndAfter(maxDate, getFirstDayOfTheMonth(date));
    const selected = selectedDates.some((d) => getDateParts(d).M === i);
    const active = M === i;

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
