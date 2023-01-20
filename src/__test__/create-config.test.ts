import { describe, test, expect } from '@jest/globals';
import { createConfig } from '../utils/create-config';
import { getDateParts } from '../utils/date';
import { isBefore } from '../utils/predicates';
import { DEFAULT_CONFIG } from '../__mock__/config';
import { ALTERNATIVE_LOCALE_CONFIG } from '../__mock__/locale';

describe('createConfig', () => {
  test('createConfig should create correct default config', () => {
    expect(createConfig()).toEqual(DEFAULT_CONFIG);
  });

  test('createConfig correctly composes calendar config', () => {
    const { calendar } = createConfig({
      calendar: { mode: 'fluid', offsets: [1] },
    });

    expect(calendar.mode).toBe('fluid');
    expect(calendar.offsets.length).toBe(2);
  });

  test('createConfig correctly creates years', () => {
    const { years } = createConfig({
      years: { numberOfYearsDisplayed: 100 },
    });

    expect(years.numberOfYearsDisplayed).toBe(100);
  });

  test('createConfig correctly composes dates', () => {
    const d = new Date();
    const { Y, M } = getDateParts(d);
    const { dates, selectedDates } = createConfig({
      selectedDates: [d],
      dates: {
        mode: 'multiple',
        toggle: true,
        minDate: new Date(Y, M - 1, 1),
        maxDate: new Date(Y, M + 1, 0),
        limit: 2,
      },
    });

    expect(dates.mode).toBe('multiple');
    expect(dates.toggle).toBeTruthy();
    expect(dates.minDate).toEqual(new Date(Y, M - 1, 1));
    expect(dates.maxDate).toEqual(new Date(Y, M + 1, 0));
    expect(selectedDates.length).toBe(1);
    expect(dates.limit).toBe(2);
  });

  test('createConfig correctly composes locales', () => {
    const { locale } = createConfig({
      locale: ALTERNATIVE_LOCALE_CONFIG,
    });

    expect(locale).toEqual(ALTERNATIVE_LOCALE_CONFIG);
  });

  test('createConfig should sort min and max date in ASC order', () => {
    const d = new Date();
    const { Y, M, D } = getDateParts(d);
    const { dates } = createConfig({
      dates: {
        minDate: new Date(Y, M + 1, D),
        maxDate: new Date(Y, M - 1, D),
      },
    });

    const { minDate, maxDate } = dates;

    expect(isBefore(minDate as Date, maxDate as Date)).toBe(true);
  });
});
