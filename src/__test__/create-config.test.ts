import { describe, test, expect } from '@jest/globals';
import { createConfig } from '../utils/create-config';
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

  test('createConfig correctly composes years', () => {
    const { years } = createConfig({
      years: { numberOfYearsDisplayed: 100 },
    });

    expect(years.numberOfYearsDisplayed).toBe(100);
  });

  test('createConfig correctly composes years', () => {
    const { years } = createConfig({
      years: { numberOfYearsDisplayed: 100 },
    });

    expect(years.numberOfYearsDisplayed).toBe(100);
  });

  test('createConfig correctly composes dates', () => {
    const { dates } = createConfig({
      dates: {
        mode: 'multiple',
        toggle: true,
        minDate: new Date(2022, 10, 1),
        maxDate: new Date(2022, 11, 0),
        selectedDates: new Date(),
        limit: 2,
      },
    });

    expect(dates.mode).toBe('multiple');
    expect(dates.toggle).toBeTruthy();
    expect(dates.minDate).toEqual(new Date(2022, 10, 1));
    expect(dates.maxDate).toEqual(new Date(2022, 11, 0));
    expect(dates.selectedDates.length).toBe(1);
    expect(dates.limit).toBe(2);
  });

  test('createConfig correctly composes locales', () => {
    const { locale } = createConfig({
      locale: ALTERNATIVE_LOCALE_CONFIG,
    });

    expect(locale).toEqual(ALTERNATIVE_LOCALE_CONFIG);
  });
});
