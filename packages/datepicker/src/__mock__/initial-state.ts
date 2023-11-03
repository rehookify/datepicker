import { vi } from 'vitest';

import { createConfig } from '../utils/config';
import { getCleanDate, getDateParts, newDate } from '../utils/date';
import { getCurrentYearPosition } from '../utils/get-current-year-position';

const config = createConfig({
  selectedDates: [],
  onDatesChange: vi.fn(),
});

export const INITIAL_STATE = {
  focusDate: undefined,
  rangeEnd: null,
  offsetDate: getCleanDate(newDate()),
  offsetYear: getCurrentYearPosition(
    getDateParts(getCleanDate(newDate())).Y,
    config.years,
  ),
};
