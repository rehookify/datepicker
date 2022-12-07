import { maxDateAndAfter, minDateAndBefore } from './predicates';

export const getCalendarStartDate = (
  minDate: Date | null,
  maxDate: Date | null,
  NOW: Date,
): Date => {
  if (maxDateAndAfter(maxDate, NOW)) return maxDate as Date;
  if (minDateAndBefore(minDate, NOW)) return minDate as Date;
  return NOW;
};
