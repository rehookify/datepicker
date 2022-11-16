import { DatesConfig } from '../types';
import { isSame, sortDatesAsc } from './date';

export const getMultipleDates = (
  selectedDates: Date[],
  day: Date,
  dates: DatesConfig,
): Date[] => {
  if (dates.mode === 'single') return [day];

  if (dates.mode === 'multiple') {
    if (dates.toggle) {
      const filtered = selectedDates.filter((d) => !isSame(d, day));
      if (filtered.length < selectedDates.length) return filtered;
    }

    return !dates.limit || selectedDates.length < dates.limit
      ? selectedDates.concat(day).sort(sortDatesAsc)
      : selectedDates;
  }

  return selectedDates.length === 2
    ? [day]
    : selectedDates.concat(day).sort(sortDatesAsc);
};
