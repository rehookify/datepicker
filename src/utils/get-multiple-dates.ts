import { DatesConfig } from '../types';
import { isRange } from './config';
import { addAndSortAsc } from './date';
import { includeDate, isSame } from './predicates';

export const getMultipleDates = (
  selectedDates: Date[],
  date: Date,
  { mode, toggle, limit }: DatesConfig,
): Date[] => {
  // If toggle is active and we have already selected this date
  // Then filter it out in all modes
  if (toggle && includeDate(selectedDates, date))
    return selectedDates.filter((d) => !isSame(d, date));

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
