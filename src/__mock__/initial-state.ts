import { createConfig } from '../utils/config';
import { getCleanDate, getDateParts, newDate } from '../utils/date';
import { getCurrentYearPosition } from '../utils/get-current-year-position';

const config = createConfig({});

export const INITIAL_STATE = {
  focusDate: null,
  rangeEnd: null,
  offsetDate: getCleanDate(newDate()),
  offsetYear: getCurrentYearPosition(
    getDateParts(getCleanDate(newDate())).Y,
    config.years,
  ),
};
