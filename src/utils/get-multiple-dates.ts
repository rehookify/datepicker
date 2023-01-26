import { DatesConfig } from '../types';
import { isRange } from './config';
import { sortDatesAsc } from './date';
import { isSame } from './predicates';

const addAndSort = (dates: Date[], d: Date) =>
  dates.concat(d).sort(sortDatesAsc);

const getFiltered = (dates: Date[], date: Date) =>
  dates.filter((d) => !isSame(d, date));

const exitFromRange = (dates: Date[], d: Date) =>
  dates.length === 2 ? [d] : addAndSort(dates, d);

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
      const filtered = getFiltered(selectedDates, date);
      if (filtered.length < selectedDates.length) return filtered;
    }

    return !limit || selectedDates.length < limit
      ? addAndSort(selectedDates, date)
      : selectedDates;
  }

  if (isRange(mode) && toggle) {
    const filtered = getFiltered(selectedDates, date);
    return filtered.length < selectedDates.length
      ? filtered
      : exitFromRange(selectedDates, date);
  }

  return exitFromRange(selectedDates, date);
};
