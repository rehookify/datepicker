import { describe, test, expect } from '@jest/globals';
import { createConfig } from '../utils/config';
import { newDate, getDateParts } from '../utils/date';
import { isBefore } from '../utils/predicates';
import { DEFAULT_CONFIG } from '../__mock__/config';
import { ALTERNATIVE_LOCALE_CONFIG } from '../__mock__/locale';

describe('createConfig', () => {
  test('should create correct default config', () => {
    expect(createConfig()).toEqual(DEFAULT_CONFIG);
  });

  test('correctly composes calendar config', () => {
    const { calendar } = createConfig({
      calendar: { mode: 'fluid', offsets: [1] },
    });

    expect(calendar.mode).toBe('fluid');
    expect(calendar.offsets.length).toBe(2);
  });

  test('correctly creates years', () => {
    const { years } = createConfig({
      years: { numberOfYearsDisplayed: 100 },
    });

    expect(years.numberOfYearsDisplayed).toBe(100);
  });

  test('correctly composes dates', () => {
    const d = newDate();
    const { Y, M } = getDateParts(d);
    const { dates, selectedDates } = createConfig({
      selectedDates: [d],
      dates: {
        mode: 'multiple',
        toggle: true,
        minDate: newDate(Y, M - 1, 1),
        maxDate: newDate(Y, M + 1, 0),
        limit: 2,
      },
    });

    expect(dates.mode).toBe('multiple');
    expect(dates.toggle).toBeTruthy();
    expect(dates.minDate).toEqual(newDate(Y, M - 1, 1));
    expect(dates.maxDate).toEqual(newDate(Y, M + 1, 0));
    expect(selectedDates.length).toBe(1);
    expect(dates.limit).toBe(2);
  });

  test('correctly composes locales', () => {
    const { locale } = createConfig({
      locale: ALTERNATIVE_LOCALE_CONFIG,
    });

    expect(locale).toEqual(ALTERNATIVE_LOCALE_CONFIG);
  });

  test('should sort min and max date in ASC order', () => {
    const d = newDate();
    const { Y, M, D } = getDateParts(d);
    const { dates } = createConfig({
      dates: {
        minDate: newDate(Y, M + 1, D),
        maxDate: newDate(Y, M - 1, D),
      },
    });

    const { minDate, maxDate } = dates;

    expect(isBefore(minDate as Date, maxDate as Date)).toBe(true);
  });

  test('should respect min and max time', () => {
    const minTime = { h: 9, m: 11 };
    const maxTime = { h: 16, m: 0 };
    const c1 = createConfig({ time: { minTime } });

    // minTime should remain as is because we don't have maxTime
    expect(c1.time.minTime).toEqual(minTime);
    expect(c1.time.maxTime).toBe(null);

    const c2 = createConfig({ time: { maxTime } });

    // maxTime should remain as is because we don't have minTime
    expect(c2.time.minTime).toBe(null);
    expect(c2.time.maxTime).toEqual(maxTime);

    const c3 = createConfig({ time: { minTime: maxTime, maxTime: minTime } });

    // We should swap min and max because minTime > maxTime
    expect(c3.time.minTime).toEqual(minTime);
    expect(c3.time.maxTime).toEqual(maxTime);

    const c4 = createConfig({ time: { minTime, maxTime } });

    // minTime and maxTime should stay as is
    expect(c4.time.minTime).toEqual(minTime);
    expect(c4.time.maxTime).toEqual(maxTime);
  });

  test('should set focusTime if it is present in selectedDates', () => {
    const d1 = newDate();
    const d2 = newDate(d1.setDate(33));
    const c1 = createConfig({ selectedDates: [d1], focusDate: d2 });

    expect(c1.focusDate).toBeNull();

    const c2 = createConfig({ selectedDates: [d1, d2], focusDate: d1 });

    expect(c2.focusDate).toEqual(d1);
  });
});
