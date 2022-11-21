import { describe, expect, test } from '@jest/globals';
import {
  getCleanDate,
  daysInMonth,
  getFirstDayOfTheMonth,
  addToDate,
  subtractFromDate,
  sortDatesAsc,
  formatMonthName,
  formatDate,
} from '../utils/date';
import { DEFAULT_LOCALE_CONFIG } from '../constants';
import { ALTERNATIVE_LOCALE_CONFIG } from '../__mock__/locale';

describe('getCleanDate', () => {
  test('getCleanDate should return Date without hours, minutes, seconds and milliseconds', () => {
    const testDate = getCleanDate(new Date());

    expect(testDate.getHours()).toBe(0);
    expect(testDate.getMinutes()).toBe(0);
    expect(testDate.getSeconds()).toBe(0);
    expect(testDate.getMilliseconds()).toBe(0);
  });
});

describe('daysInMonth', () => {
  test('daysInMonth should return correct number of days', () => {
    const DAYS_IN_JANUARY = 31;
    const DAYS_IN_APRIL = 30;

    expect(daysInMonth(new Date(2022, 0, 1))).toBe(DAYS_IN_JANUARY);
    expect(daysInMonth(new Date(2022, 3, 1))).toBe(DAYS_IN_APRIL);
  });
});

describe('getFirstDayOfTheMonth', () => {
  test('getFirstDayOfTheMonth must return first day of the month', () => {
    const testDate = new Date(2022, 2, 12);

    const firstDayOfTheMonth = getFirstDayOfTheMonth(testDate);

    expect(firstDayOfTheMonth.getFullYear()).toBe(testDate.getFullYear());
    expect(firstDayOfTheMonth.getMonth()).toBe(testDate.getMonth());
    expect(firstDayOfTheMonth.getDate()).toBe(1);
  });
});

describe('addToDate', () => {
  const testDate = new Date(2022, 0, 1);
  test('addToDate adds years correctly', () => {
    expect(addToDate(testDate, 1, 'year').getFullYear()).toBe(2023);
    expect(addToDate(testDate, 10, 'year').getFullYear()).toBe(2032);
    expect(addToDate(testDate, -1, 'year').getFullYear()).toBe(2021);
  });

  test('addToDate adds months correctly', () => {
    expect(addToDate(testDate, 1, 'month').getMonth()).toBe(1);
    expect(addToDate(testDate, 10, 'month').getMonth()).toBe(10);

    //Edge cases switching between years forward and backward
    expect(addToDate(testDate, -1, 'month').getMonth()).toBe(11);
    expect(addToDate(testDate, -1, 'month').getFullYear()).toBe(2021);
    expect(addToDate(testDate, 12, 'month').getMonth()).toBe(0);
    expect(addToDate(testDate, 12, 'month').getFullYear()).toBe(2023);
  });

  test('addToDate adds dates correctly', () => {
    expect(addToDate(testDate, 1, 'date').getDate()).toBe(2);

    //Edge cases switching between months and years
    //It should be the 1 of February
    expect(addToDate(testDate, 31, 'date').getDate()).toBe(1);
    expect(addToDate(testDate, 31, 'date').getMonth()).toBe(1);

    // It should be the 31 of December 2021
    expect(addToDate(testDate, -1, 'date').getDate()).toBe(31);
    expect(addToDate(testDate, -1, 'date').getMonth()).toBe(11);
    expect(addToDate(testDate, -1, 'date').getFullYear()).toBe(2021);
  });
});

describe('subtractFromDate', () => {
  const testDate = new Date(2022, 1, 11);
  test('subtractFromDate subtracts years correctly', () => {
    expect(subtractFromDate(testDate, 1, 'year').getFullYear()).toBe(2021);
    expect(subtractFromDate(testDate, 10, 'year').getFullYear()).toBe(2012);
    expect(subtractFromDate(testDate, -1, 'year').getFullYear()).toBe(2023);
  });

  test('subtractFromDate subtracts months correctly', () => {
    expect(subtractFromDate(testDate, 1, 'month').getMonth()).toBe(0);
    expect(subtractFromDate(testDate, -1, 'month').getMonth()).toBe(2);

    // Edge case switching between years
    expect(subtractFromDate(testDate, 2, 'month').getMonth()).toBe(11);
    expect(subtractFromDate(testDate, 2, 'month').getFullYear()).toBe(2021);
  });

  test('subtractFromDate subtracts dates correctly', () => {
    expect(subtractFromDate(testDate, 1, 'date').getDate()).toBe(10);
    expect(subtractFromDate(testDate, -1, 'date').getDate()).toBe(12);

    // Edge case switching between months
    expect(subtractFromDate(testDate, 11, 'date').getDate()).toBe(31);
    expect(subtractFromDate(testDate, 11, 'date').getMonth()).toBe(0);
  });
});

describe('sortDatesAsc', () => {
  test('sortDatesAsc sorts dates in ASC order', () => {
    const testDates = [
      new Date(2022, 10, 20),
      new Date(2021, 11, 31),
      new Date(2022, 8, 11),
    ].sort(sortDatesAsc);

    expect(testDates[0].getFullYear()).toBe(2021);
    expect(testDates[1].getMonth()).toBe(8);
    expect(testDates[2].getDate()).toBe(20);
  });
});

describe('formatMonthName', () => {
  test('formatMonthName formats moth name according to locale configuration', () => {
    // The 20 of November 2022
    const testDate = new Date(2022, 10, 20);

    expect(formatMonthName(testDate, DEFAULT_LOCALE_CONFIG)).toBe('November');
    // Short version of Ukrainian "листопад"
    expect(formatMonthName(testDate, ALTERNATIVE_LOCALE_CONFIG)).toBe('лис');
  });
});

describe('formatDate', () => {
  test('formatDate formats date according to locale configuration', () => {
    const testDate = new Date(2022, 7, 31);

    expect(formatDate(testDate, DEFAULT_LOCALE_CONFIG)).toBe('31/08/2022');
    expect(formatDate(testDate, ALTERNATIVE_LOCALE_CONFIG)).toBe(
      '31 серпня 22 р.',
    );
  });
});
