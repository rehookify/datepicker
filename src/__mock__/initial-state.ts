import { NOW } from '../constants';
import { createConfig } from '../utils/create-config';
import { getDateParts } from '../utils/date';
import { getCurrentYearPosition } from '../utils/get-current-year-position';

const config = createConfig({});

export const INITIAL_STATE = {
  rangeEnd: null,
  selectedDates: [],
  config,
  offsetDate: NOW,
  offsetYear: getCurrentYearPosition(getDateParts(NOW).Y, config.years),
};
