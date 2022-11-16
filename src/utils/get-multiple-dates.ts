import { DatesConfig } from '../types';
import { isSame } from './date';

export const getMultipleDates = (
  selectedDates: Date[],
  day: Date,
  dates: DatesConfig,
): Date[] => {
  if (dates.mode !== 'multiple') return [day];

  if (dates.mode === 'multiple') {
    if (dates.toggle) {
      const filtered = selectedDates.filter((d) => !isSame(d, day));
      if (filtered.length < selectedDates.length) return filtered;
    }

    return selectedDates.length < dates?.limit
      ? selectedDates.concat(day).sort()
      : selectedDates;
  }

  //@TODO logic for dates.mode === 'range'
  return [];
};
