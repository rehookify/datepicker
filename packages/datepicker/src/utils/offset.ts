import { setOffset } from '../state-reducer';
import { DPOffsetValue, DPState } from '../types';
import { addToDate } from './date';

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
