import type { DPDatesConfig } from '../types';
import { isRange } from './config';
import { addAndSortAsc, getCleanDate } from './date';
import { includeDate, isSame } from './predicates';

export const getMultipleDates = (
  selectedDates: Date[],
  date: Date,
  { mode, toggle, limit }: DPDatesConfig,
): Date[] => {
  // If toggle is active and we have already selected this date
  // Then filter it out in all modes
  if (toggle && includeDate(selectedDates, date))
    return selectedDates.filter((d) => !isSame(getCleanDate(d), date));

  if (mode === 'multiple')
    return !limit || selectedDates.length < limit
      ? addAndSortAsc(selectedDates, date)
      : selectedDates;

  if (isRange(mode))
    return selectedDates.length === 2
      ? [date]
      : addAndSortAsc(selectedDates, date);

  // mode === 'single'
  return [date];
};
