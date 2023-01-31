import { DatesMode, DayRange } from '../types';
import { getCleanDate } from './date';
import { isBefore, isBetween, isSame } from './predicates';

export const getDateRangeState = (
  date: Date,
  rangeEnd: Date | null,
  selectedDates: Date[],
  mode: DatesMode,
): DayRange => {
  if (mode !== 'range') return '';
  // We have completed range
  if (selectedDates.length === 2) {
    if (isSame(date, getCleanDate(selectedDates[0]))) {
      return isSame(
        getCleanDate(selectedDates[0]),
        getCleanDate(selectedDates[1]),
      )
        ? 'range-start range-end'
        : 'range-start';
    }
    if (isSame(date, getCleanDate(selectedDates[1]))) return 'range-end';
    if (
      isBetween(
        getCleanDate(selectedDates[0]),
        date,
        getCleanDate(selectedDates[1]),
      )
    )
      return 'in-range';
    return '';
  }

  // We have 1 date and rangeEnd date
  if (selectedDates.length === 1 && rangeEnd) {
    if (isBetween(getCleanDate(selectedDates[0]), date, rangeEnd))
      return 'will-be-in-range';
    // rangeEnd is before selectedDates[0]
    if (isBefore(rangeEnd, getCleanDate(selectedDates[0]))) {
      if (isSame(date, rangeEnd)) return 'will-be-range-start';
      if (isSame(date, getCleanDate(selectedDates[0])))
        return 'will-be-range-end';
      return '';
    }

    // rangeEnd is after selectedDates[0];
    if (isSame(date, getCleanDate(selectedDates[0])))
      return 'will-be-range-start';
    if (isSame(date, rangeEnd)) return 'will-be-range-end';
    return '';
  }

  return '';
};
