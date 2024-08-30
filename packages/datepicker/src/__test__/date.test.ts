import { describe, expect, test } from 'vitest';

import { ALTERNATIVE_LOCALE_CONFIG } from '../__mock__/locale';
import { DPLocaleConfig } from '../types';
import {
  addAndSortAsc,
  addToDate,
  daysInMonth,
  formatDate,
  formatLocaleTime,
  formatMonthName,
  formatTime,
  getCleanDate,
  getDateParts,
  getTimeDate,
  newDate,
  sortDatesAsc,
  subtractFromDate,
  toLocaleDateString,
} from '../utils/date';

var DEFAULT_LOCALE_CONFIG: DPLocaleConfig = {
  locale: 'en-GB',
  day: '2-digit',
  year: 'numeric',
  weekday: 'short',
  monthName: 'long',
  hour: '2-digit',
  minute: '2-digit',
  hour12: undefined,
  second: undefined,
};

describe('getCleanDate', () => {
  test('getCleanDate should return Date without hours, minutes, seconds and milliseconds', () => {
    const testDate = getCleanDate(newDate());

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

    expect(daysInMonth(newDate(2022, 0, 1))).toBe(DAYS_IN_JANUARY);
    expect(daysInMonth(newDate(2022, 3, 1))).toBe(DAYS_IN_APRIL);
  });
});

describe('addToDate', () => {
  const start = newDate(2022, 0, 1);
  const end = newDate(2023, 0, 31);
  test('addToDate adds years correctly', () => {
    expect(addToDate(start, 1, 'year').getFullYear()).toBe(2023);
    expect(addToDate(start, 10, 'year').getFullYear()).toBe(2032);
    expect(addToDate(start, -1, 'year').getFullYear()).toBe(2021);
  });

  test('addToDate adds months correctly', () => {
    expect(addToDate(start, 1, 'month').getMonth()).toBe(1);
    expect(addToDate(start, 10, 'month').getMonth()).toBe(10);

    // Edge case when we adding 1 month to the 31 of January
    // the February doesn't have 31 days so it should return the last day of February
    expect(addToDate(end, 1, 'month').getMonth()).toBe(1);
    expect(addToDate(end, 1, 'month').getDate()).toBe(28);

    //Edge cases switching between years forward and backward
    expect(addToDate(start, -1, 'month').getMonth()).toBe(11);
    expect(addToDate(start, -1, 'month').getFullYear()).toBe(2021);
    expect(addToDate(start, 12, 'month').getMonth()).toBe(0);
    expect(addToDate(start, 12, 'month').getFullYear()).toBe(2023);
  });

  test('addToDate adds dates correctly', () => {
    expect(addToDate(start, 1, 'date').getDate()).toBe(2);

    //Edge cases switching between months and years
    //It should be the 1 of February
    expect(addToDate(start, 31, 'date').getDate()).toBe(1);
    expect(addToDate(start, 31, 'date').getMonth()).toBe(1);

    // It should be the 31 of December 2021
    expect(addToDate(start, -1, 'date').getDate()).toBe(31);
    expect(addToDate(start, -1, 'date').getMonth()).toBe(11);
    expect(addToDate(start, -1, 'date').getFullYear()).toBe(2021);
  });
});

describe('subtractFromDate', () => {
  const testDate = newDate(2022, 1, 11);
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
      newDate(2022, 10, 20),
      newDate(2021, 11, 31),
      newDate(2022, 8, 11),
    ].sort(sortDatesAsc);

    expect(testDates[0].getFullYear()).toBe(2021);
    expect(testDates[1].getMonth()).toBe(8);
    expect(testDates[2].getDate()).toBe(20);
  });
});

describe('formatMonthName', () => {
  test('formatMonthName formats moth name according to locale configuration', () => {
    // The 20 of November 2022
    const testDate = newDate(2022, 10, 20);

    expect(formatMonthName(testDate, DEFAULT_LOCALE_CONFIG)).toBe('November');
    // Short version of Ukrainian "листопад"
    // Note node 16 has value "лис" and node 18+ has value "лист."
    expect(formatMonthName(testDate, ALTERNATIVE_LOCALE_CONFIG)).toMatch(/лис/);
  });
});

describe('formatDate', () => {
  test('formatDate formats date according to locale configuration', () => {
    const testDate = newDate(2022, 7, 31);

    expect(formatDate(testDate, DEFAULT_LOCALE_CONFIG)).toBe('31/08/2022');
  });
});

describe('getDateParts', () => {
  test('getDateParts should return correct date parts', () => {
    const d1 = newDate(2022, 10, 25);
    const { D, M, Y } = getDateParts(d1);

    expect(D).toBe(d1.getDate());
    expect(M).toBe(d1.getMonth());
    expect(Y).toBe(d1.getFullYear());
  });
});

// It is partially tested in formatDate and formatMonthName
describe('toLocaleDateString', () => {
  test('toLocaleDateString should format date correctly', () => {
    const d1 = newDate(2022, 10, 25);
    expect(toLocaleDateString(d1, 'en-GB')).toBe('25/11/2022');
  });
});

describe('getTimeDate', () => {
  const { Y, M, D } = getDateParts(newDate());
  test('should return null', () => {
    expect(getTimeDate(Y, M, D)).toBe(undefined);
  });

  test('should return date with limit', () => {
    const timeLimit = newDate(Y, M, D, 11, 30);
    expect(getTimeDate(Y, M, D, { h: 11, m: 30 })).toEqual(timeLimit);
  });
});

describe('formatLocaleTime', () => {
  const d = newDate(2023, 0, 31, 22, 22);
  test('should return time in 24h mode', () => {
    expect(formatLocaleTime(d, DEFAULT_LOCALE_CONFIG)).toBe('22:22');
  });

  test('should return time in 12h mode', () => {
    const LOCALE_CONFIG = { ...DEFAULT_LOCALE_CONFIG, hour12: true };

    const formatted = formatLocaleTime(d, LOCALE_CONFIG);

    // We need to test like this because we have different space symbol here and CI
    expect(formatted.slice(0, 5)).toBe('10:22');
    expect(formatted.slice(6)).toBe('pm');
  });
});

describe('addAndSortAsc', () => {
  test('should add and sort dates correctly', () => {
    const d1 = newDate(2023, 1, 3);
    const d2 = newDate(2023, 1, 4);
    const d3 = newDate(2023, 1, 5);

    expect(addAndSortAsc([d2], d1)).toEqual([d1, d2]);
    expect(addAndSortAsc([d2], d3)).toEqual([d2, d3]);
  });
});

describe('formatTime', () => {
  test('should add leading zero before hours and minutes', () => {
    const d1 = newDate(2023, 8, 7, 1, 7);

    expect(formatTime(d1, { hour12: false } as DPLocaleConfig)).toBe('01:07');
  });

  test('should convert 24h time to 12h time', () => {
    const d1 = newDate(2023, 8, 7);
    const d2 = newDate(2023, 8, 7, 24, 0);
    const d3 = newDate(2023, 8, 7, 12, 0);
    const d4 = newDate(2023, 8, 7, 13, 11);
    const d5 = newDate(2023, 8, 7, 3, 3);

    expect(formatTime(d1, { hour12: true } as DPLocaleConfig)).toBe('12:00 am');
    expect(formatTime(d2, { hour12: true } as DPLocaleConfig)).toBe('12:00 am');
    expect(formatTime(d5, { hour12: true } as DPLocaleConfig)).toBe('03:03 am');
    expect(formatTime(d3, { hour12: true } as DPLocaleConfig)).toBe('12:00 pm');
    expect(formatTime(d4, { hour12: true } as DPLocaleConfig)).toBe('01:11 pm');
  });
});
