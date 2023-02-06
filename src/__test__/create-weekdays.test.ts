import { describe, test, expect } from '@jest/globals';
import { createCalendars } from '../utils/create-calendars';
import { createConfig } from '../utils/config';
import { createWeekdays } from '../utils/create-weekdays';
import { getCleanDate, newDate } from '../utils/date';

import { ALTERNATIVE_LOCALE_CONFIG } from '../__mock__/locale';

const now = getCleanDate(newDate());
const config = createConfig();

const TEST_CALENDAR = createCalendars(now, [], null, config)[0];

describe('createWeekdays', () => {
  test('createWeekdays create weekdays correctly with default props', () => {
    const weekdays = createWeekdays(TEST_CALENDAR, config);

    expect(weekdays.length).toBe(7);
    expect(weekdays).toEqual(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
  });

  test('createWeekdays create weekdays correctly with alternative locale', () => {
    const config = createConfig({ locale: ALTERNATIVE_LOCALE_CONFIG });
    const weekdays = createWeekdays(TEST_CALENDAR, config);

    // Weekdays with Ukrainian locale and weekdays = 'short'
    expect(weekdays).toEqual(['нд', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']);
  });
});
