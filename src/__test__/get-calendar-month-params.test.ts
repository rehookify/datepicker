import { describe, expect, test, vi } from 'vitest';

import { createConfig } from '../utils/config';
import { getDateParts, newDate } from '../utils/date';
import { getCalendarMonthParams } from '../utils/get-calendar-month-params';

describe('getCalendarMonthParams', () => {
  const { Y, M } = getDateParts(newDate(2023, 0, 1));

  test('should return correct data in static mode', () => {
    const config = createConfig({
      selectedDates: [],
      onDatesChange: vi.fn(),
      calendar: { mode: 'static' },
    });
    expect(getCalendarMonthParams(M, Y, config.calendar)).toEqual({
      start: 0,
      length: 42,
    });
  });

  test('getCalendarMonthParams should return correct data in fluid mode', () => {
    const config = createConfig({
      selectedDates: [],
      onDatesChange: vi.fn(),
      calendar: { mode: 'fluid' },
    });
    expect(getCalendarMonthParams(M, Y, config.calendar)).toEqual({
      start: 0,
      length: 35,
    });
  });
});
