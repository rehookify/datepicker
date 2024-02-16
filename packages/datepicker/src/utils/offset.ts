import { setOffset } from '../state-reducer';
import { DPOffsetValue, DPState } from '../types';
import { addToDate, subtractFromDate } from './date';
import { isSame, maxDateAndAfter, minDateAndBefore } from './predicates';

export const setDPOffset =
  ({ dispatch, config: { onOffsetChange, offsetDate } }: DPState) =>
  (d: Date): void => {
    // Prevent to call reducer action if offsetDate is external
    if (!onOffsetChange && !offsetDate) setOffset(dispatch, d);
    if (onOffsetChange) onOffsetChange(d);
  };

export const getNextOffsetDate = (
  d: Date,
  { days, months, years }: DPOffsetValue,
): Date => {
  let nextDate = d;
  if (days && days !== 0) {
    nextDate = addToDate(nextDate, days, 'date');
  }
  if (months && months !== 0) {
    nextDate = addToDate(nextDate, months, 'month');
  }
  if (years && years !== 0) {
    nextDate = addToDate(nextDate, years, 'year');
  }
  return nextDate;
};

export const getEdgedOffsetDate = (
  offsetDate: Date,
  { days = 0, months = 0, years = 0 }: DPOffsetValue,
  dateEdge?: Date,
): Date => {
  if (!dateEdge) return offsetDate;
  if (isSame(offsetDate, dateEdge)) return offsetDate;
  if (days !== 0) {
    return calculateNewDateWithOffset(offsetDate, dateEdge, days, 'date');
  }
  if (months !== 0) {
    return calculateNewDateWithOffset(offsetDate, dateEdge, months, 'month');
  }
  if (years !== 0) {
    return calculateNewDateWithOffset(offsetDate, dateEdge, years, 'year');
  }

  return offsetDate;
};

export const calculateNewDateWithOffset = (
  offsetDate: Date,
  dateEdge: Date,
  offsetValue: number,
  unit: 'date' | 'month' | 'year',
): Date => {
  const newDate = addToDate(offsetDate, offsetValue, unit);
  const isPositiveOffsetValue = offsetValue > 0;
  if (isPositiveOffsetValue) {
    const isMaxDateAfterNewDate = maxDateAndAfter(dateEdge, newDate);
    return isMaxDateAfterNewDate
      ? subtractFromDate(dateEdge, offsetValue, unit)
      : offsetDate;
  }
  const isMinDateBeforeNewDate = minDateAndBefore(dateEdge, newDate);
  return isMinDateBeforeNewDate
    ? subtractFromDate(dateEdge, offsetValue, unit)
    : offsetDate;
};
