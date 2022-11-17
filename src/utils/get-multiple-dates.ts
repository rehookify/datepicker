import { DatesConfig } from '../types';
import { isSame, sortDatesAsc } from './date';

export const getMultipleDates = (
  selectedDates: Date[],
  date: Date,
  { mode, toggle, limit }: DatesConfig,
): Date[] => {
  if (mode === 'single') {
    return toggle && selectedDates[0] && isSame(date, selectedDates[0])
      ? []
      : [date];
  }

  if (mode === 'multiple') {
    if (toggle) {
      const filtered = selectedDates.filter((d) => !isSame(d, date));
      if (filtered.length < selectedDates.length) return filtered;
    }

    return !limit || selectedDates.length < limit
      ? selectedDates.concat(date).sort(sortDatesAsc)
      : selectedDates;
  }

  return selectedDates.length === 2
    ? [date]
    : selectedDates.concat(date).sort(sortDatesAsc);
};
