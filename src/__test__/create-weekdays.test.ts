import { describe, test, expect } from '@jest/globals';
import { createCalendars } from '../utils/create-calendars';
import { createConfig } from '../utils/create-config';
import { createWeekdays } from '../utils/create-weekdays';
import { getCleanDate } from '../utils/date';

import { ALTERNATIVE_LOCALE_CONFIG } from '../__mock__/locale';

const now = getCleanDate(new Date());
const { locale, dates, calendar } = createConfig();

const TEST_CALENDAR = createCalendars(
  now,
  [],
  null,
  locale,
  dates,
  calendar,
)[0];

describe('createWeekdays', () => {
  test('createWeekdays create weekdays correctly with default props', () => {
    const { locale } = createConfig();
    const weekdays = createWeekdays(TEST_CALENDAR, locale);

    expect(weekdays.length).toBe(7);
    expect(weekdays).toEqual(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
  });

  test('createWeekdays create weekdays correctly with alternative locale', () => {
    const weekdays = createWeekdays(TEST_CALENDAR, ALTERNATIVE_LOCALE_CONFIG);

    // Weekdays with Ukrainian locale and weekdays = 'short'
    expect(weekdays).toEqual(['нд', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']);
  });
});
