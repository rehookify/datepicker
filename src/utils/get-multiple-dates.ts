import { DatesConfig } from '../types';
import { sortDatesAsc } from './date';
import { isSame } from './predicates';

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

  if (mode === 'range' && toggle) {
    const filtered = selectedDates.filter((d) => !isSame(d, date));
    if (filtered.length < selectedDates.length) return filtered;

    return selectedDates.length === 2
      ? [date]
      : selectedDates.concat(date).sort(sortDatesAsc);
  } else {
    return selectedDates.length === 2
      ? [date]
      : selectedDates.concat(date).sort(sortDatesAsc);
  }
};
