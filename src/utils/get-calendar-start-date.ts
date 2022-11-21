import { DatesConfig } from '../types';
import { maxDateAndAfter, minDateAndBefore } from './predicates';

export const getCalendarStartDate = (
  { maxDate, minDate }: DatesConfig,
  NOW: Date,
): Date => {
  if (maxDateAndAfter(maxDate, NOW)) return maxDate as Date;
  if (minDateAndBefore(minDate, NOW)) return minDate as Date;
  return NOW;
};
