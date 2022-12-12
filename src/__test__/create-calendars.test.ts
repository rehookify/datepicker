import { describe, expect, test } from '@jest/globals';
import { createCalendars } from '../utils/create-calendars';
import { createConfig } from '../utils/create-config';
import { getCleanDate } from '../utils/date';
import { TEST_CALENDAR } from '../__mock__/calendar';

describe('createCalendars', () => {
  test('createCalendars should create a calendar correctly with default configuration', () => {
    const calendarDate = getCleanDate(new Date(2022, 10, 20));
    const { locale, dates, calendar } = createConfig();

    const testCalendar = createCalendars(
      calendarDate,
      [],
      null,
      calendarDate,
      locale,
      dates,
      calendar,
    );
    const [head] = testCalendar;

    expect(testCalendar.length).toBe(1);
    expect(head).toEqual(TEST_CALENDAR);
    expect(head.days[20].isToday).toBeTruthy();
    expect(head.days.length).toBe(42);
  });

  test('createCalendars should create correct number of calendars', () => {
    const calendarDate = getCleanDate(new Date(2022, 10, 20));
    const { locale, dates, calendar } = createConfig({
      calendar: { offsets: [-1, 1] },
    });

    const testCalendar = createCalendars(
      calendarDate,
      [],
      null,
      calendarDate,
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
    const calendarDate = getCleanDate(new Date(2022, 10, 20));
    const { locale, dates, calendar } = createConfig({
      calendar: { mode: 'fluid' },
    });

    const [testCalendar] = createCalendars(
      calendarDate,
      [],
      null,
      calendarDate,
      locale,
      dates,
      calendar,
    );

    expect(testCalendar.days.length).toBe(35);
  });
});
