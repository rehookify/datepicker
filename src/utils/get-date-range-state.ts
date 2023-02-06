import { DatesMode, DayRange } from '../types';
import { isRange } from './config';
import { getCleanDate } from './date';
import { isBefore, isBetween, isSame } from './predicates';

const RANGE_START = 'range-start';
const RANGE_END = 'range-end';
const WILL_BE_IN_RANGE_START = 'will-be-range-start';
const WILL_BE_IN_RANGE_END = 'will-be-range-end';

export const getDateRangeState = (
  date: Date,
  rangeEnd: Date | null,
  selectedDates: Date[],
  mode: DatesMode,
): DayRange => {
  if (!isRange(mode)) return '';
  const [start, end] = selectedDates;
  // We have completed range
  if (start && end) {
    if (isSame(date, getCleanDate(start))) {
      return isSame(getCleanDate(start), getCleanDate(end))
        ? `${RANGE_START} ${RANGE_END}`
        : RANGE_START;
    }
    if (isSame(date, getCleanDate(end))) return RANGE_END;
    return isBetween(getCleanDate(start), date, getCleanDate(end))
      ? 'in-range'
      : '';
  }

  // We have 1 date and rangeEnd date
  if (!end && rangeEnd) {
    if (isBetween(getCleanDate(start), date, rangeEnd))
      return 'will-be-in-range';
    // rangeEnd is before start
    if (isBefore(rangeEnd, getCleanDate(start))) {
      if (isSame(date, rangeEnd)) return WILL_BE_IN_RANGE_START;
      return isSame(date, getCleanDate(start)) ? WILL_BE_IN_RANGE_END : '';
    }

    // rangeEnd is after start;
    if (isSame(date, getCleanDate(start))) return WILL_BE_IN_RANGE_START;
    return isSame(date, rangeEnd) ? WILL_BE_IN_RANGE_END : '';
  }

  return '';
};
