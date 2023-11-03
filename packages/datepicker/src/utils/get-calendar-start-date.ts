import { maxDateAndAfter, minDateAndBefore } from './predicates';

export const getCalendarStartDate = (
  minDate: Date | undefined,
  maxDate: Date | undefined,
  NOW: Date,
): Date => {
  if (maxDateAndAfter(maxDate, NOW)) return maxDate as Date;
  if (minDateAndBefore(minDate, NOW)) return minDate as Date;
  return NOW;
};
