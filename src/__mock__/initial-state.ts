import { createConfig } from '../utils/config';
import { newDate, getCleanDate, getDateParts } from '../utils/date';
import { getCurrentYearPosition } from '../utils/get-current-year-position';

const config = createConfig({});

export const INITIAL_STATE = {
  focusDate: null,
  rangeEnd: null,
  config,
  offsetDate: getCleanDate(newDate()),
  offsetYear: getCurrentYearPosition(
    getDateParts(getCleanDate(newDate())).Y,
    config.years,
  ),
};
