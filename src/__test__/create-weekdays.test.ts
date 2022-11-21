import { describe, test, expect } from '@jest/globals';
import { createConfig } from '../utils/create-config';
import { createWeekdays } from '../utils/create-weekdays';
import { TEST_CALENDAR } from '../__mock__/calendar';
import { ALTERNATIVE_LOCALE_CONFIG } from '../__mock__/locale';

describe('createWeekdays', () => {
  test('createWeekdays create weekdays correctly with default props', () => {
    const { locale } = createConfig();
    const weekdays = createWeekdays(TEST_CALENDAR, locale);

    expect(weekdays.length).toBe(7);
    expect(weekdays).toEqual(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);
  });

  test('createWeekdays create weekdays correctly with alternative locale', () => {
    const weekdays = createWeekdays(TEST_CALENDAR, ALTERNATIVE_LOCALE_CONFIG);

    // Weekdays with Ukrainian locale and weekdays = 'short'
    expect(weekdays).toEqual(['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'нд']);
  });
});
