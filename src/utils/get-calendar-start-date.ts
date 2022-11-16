import { NOW } from '../constants';
import { DatesConfig } from '../types';
import { maxDateAndAfter, minDateAndBefore } from './predicates';

export const getCalendarStartDate = ({
  maxDate,
  minDate,
}: DatesConfig): Date => {
  if (maxDateAndAfter(maxDate, NOW)) return maxDate!;
  if (minDateAndBefore(minDate, NOW)) return minDate!;
  return NOW;
};
