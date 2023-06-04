import { describe, expect, test, vi } from 'vitest';

import { createConfig } from '../utils/config';
import { createCalendars } from '../utils/create-calendars';
import { createInitialState } from '../utils/create-initial-state';
import { getCleanDate, newDate } from '../utils/date';
import { isSame } from '../utils/predicates';

describe('isExcludedDay', () => {
  test('should exclude day correctly', () => {
    // exclude all Sundays
    const EXCLUDED_DATE = 0;
    const config = createConfig({
      exclude: {
        day: [EXCLUDED_DATE],
      },
    });

    const state = createInitialState(config);
    const [calendar] = createCalendars({
      selectedDates: [] as Date[],
      state,
      config,
      dispatch: vi.fn(),
    });
    const { days } = calendar;

    days.forEach((day) => {
      if (day.$date.getDay() === EXCLUDED_DATE) {
        expect(day.disabled).toBe(true);
      }
    });
  });
});

describe('isExcludedDate', () => {
  test('should exclude dates', () => {
    const NOW = getCleanDate(newDate());
    const config = createConfig({
      exclude: {
        date: [NOW],
      },
    });

    const state = createInitialState(config);
    const [calendar] = createCalendars({
      selectedDates: [] as Date[],
      state,
      config,
      dispatch: vi.fn(),
    });
    const { days } = calendar;

    days.forEach((day) => {
      if (isSame(day.$date, NOW)) {
        expect(day.disabled).toBe(true);
      }
    });
  });
});
