import { describe, expect, test } from '@jest/globals';

import { createConfig } from '../utils/config';
import { createCalendars } from '../utils/create-calendars';
import { getCleanDate, newDate } from '../utils/date';

describe('createCalendars', () => {
  test('createCalendars should create a calendar correctly with default configuration', () => {
    const now = getCleanDate(newDate());
    const config = createConfig();

    const testCalendar = createCalendars(now, [], null, config);
    const { days } = testCalendar[0];

    const today = days.filter(({ now }) => now);

    expect(testCalendar.length).toBe(1);
    expect(today.length).toBe(1);
    expect(today[0].$date).toEqual(now);
    expect(days.length).toBe(42);
  });

  test('createCalendars should create correct number of calendars', () => {
    const offsetDate = getCleanDate(newDate(2022, 10, 20));
    const config = createConfig({
      calendar: { offsets: [-1, 1] },
    });

    const testCalendar = createCalendars(offsetDate, [], null, config);

    expect(testCalendar.length).toBe(3);
    expect(testCalendar[0].month).toBe('November');
    expect(testCalendar[1].month).toBe('October');
    expect(testCalendar[2].month).toBe('December');
  });

  test('createCalendars should create correct fluid calendar', () => {
    const offsetDate = getCleanDate(newDate(2022, 10, 20));
    const config = createConfig({
      calendar: { mode: 'fluid' },
    });

    const [testCalendar] = createCalendars(offsetDate, [], null, config);

    expect(testCalendar.days.length).toBe(35);
  });
});
