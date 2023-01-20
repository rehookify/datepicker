import { createConfig } from '../utils/create-config';
import { getCleanDate, getDateParts } from '../utils/date';
import { getCurrentYearPosition } from '../utils/get-current-year-position';

const config = createConfig({});

export const INITIAL_STATE = {
  rangeEnd: null,
  config,
  offsetDate: getCleanDate(new Date()),
  offsetYear: getCurrentYearPosition(
    getDateParts(getCleanDate(new Date())).Y,
    config.years,
  ),
};
