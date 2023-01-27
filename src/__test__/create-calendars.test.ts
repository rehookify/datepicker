import { describe, expect, test } from '@jest/globals';
import { createCalendars } from '../utils/create-calendars';
import { createConfig } from '../utils/config';
import { getCleanDate } from '../utils/date';

describe('createCalendars', () => {
  test('createCalendars should create a calendar correctly with default configuration', () => {
    const now = getCleanDate(new Date());
    const { locale, dates, calendar } = createConfig();

    const testCalendar = createCalendars(
      now,
      [],
      null,
      locale,
      dates,
      calendar,
    );
    const { days } = testCalendar[0];

    const today = days.filter(({ now }) => now);

    expect(testCalendar.length).toBe(1);
    expect(today.length).toBe(1);
    expect(today[0].$date).toEqual(now);
    expect(days.length).toBe(42);
  });

  test('createCalendars should create correct number of calendars', () => {
    const offsetDate = getCleanDate(new Date(2022, 10, 20));
    const { locale, dates, calendar } = createConfig({
      calendar: { offsets: [-1, 1] },
    });

    const testCalendar = createCalendars(
      offsetDate,
      [],
      null,
      locale,
      dates,
      calendar,
    );

    expect(testCalendar.length).toBe(3);
    expect(testCalendar[0].month).toBe('November');
    expect(testCalendar[1].month).toBe('October');
    expect(testCalendar[2].month).toBe('December');
  });

  test('createCalendars should create correct fluid calendar', () => {
    const offsetDate = getCleanDate(new Date(2022, 10, 20));
    const { locale, dates, calendar } = createConfig({
      calendar: { mode: 'fluid' },
    });

    const [testCalendar] = createCalendars(
      offsetDate,
      [],
      null,
      locale,
      dates,
      calendar,
    );

    expect(testCalendar.days.length).toBe(35);
  });
});
