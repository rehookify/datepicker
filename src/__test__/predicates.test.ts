import { describe, expect, test } from 'vitest';

import { newDate } from '../utils/date';
import {
  includeDate,
  isAfter,
  isAfterMaxMonth,
  isAfterMaxYear,
  isBefore,
  isBeforeMinMonth,
  isBeforeMinYear,
  isBetween,
  isSame,
  maxDateAndAfter,
  minDateAndBefore,
} from '../utils/predicates';

describe('isSame', () => {
  test('isSame should return true if dates is equal', () => {
    const d1 = newDate(2022, 10, 21);
    const d2 = d1;
    const d3 = newDate(2022, 10, 21, 12);

    expect(isSame(d1, d2)).toBe(true);
    expect(isSame(d1, d3)).toBe(false);
  });
});

describe('isBefore', () => {
  test('isBefore should return true if date1 < date2', () => {
    const d1 = newDate(2022, 10, 21);
    const d2 = d1;
    const d3 = newDate(2022, 10, 21, 12);
    const d4 = newDate(2022, 10, 20, 11);

    expect(isBefore(d1, d2)).toBe(false);
    expect(isBefore(d1, d3)).toBe(true);
    expect(isBefore(d3, d1)).toBe(false);
    expect(isBefore(d4, d1)).toBe(true);
  });
});

describe('isAfter', () => {
  test('isAfter should return true if date1 > date2', () => {
    const d1 = newDate(2022, 10, 21);
    const d2 = d1;
    const d3 = newDate(2022, 10, 21, 12);

    expect(isAfter(d1, d2)).toBe(false);
    expect(isAfter(d1, d3)).toBe(false);
    expect(isAfter(d3, d1)).toBe(true);
  });
});

describe('isBetween', () => {
  test('isBefore should return true is date1 < date2 < date3 or date1 > date2 > date3', () => {
    const d1 = newDate(2022, 10, 21);
    const d2 = d1;
    const d3 = newDate(2022, 10, 20);
    const d4 = newDate(2022, 10, 22);

    expect(isBetween(d3, d1, d4)).toBe(true);
    expect(isBetween(d4, d1, d3)).toBe(true);
    expect(isBetween(d1, d2, d3)).toBe(false);
    expect(isBetween(d3, d1, d2)).toBe(false);
  });
});

describe('maxDateAndAfter', () => {
  test('maxDateAndAfter should return true if maxDate is exist and date > maxDate', () => {
    const d1 = newDate(2022, 10, 21);
    const d2 = newDate(2022, 10, 30);
    const maxDate = newDate(2022, 10, 23);

    expect(maxDateAndAfter(maxDate, d1)).toBe(false);
    expect(maxDateAndAfter(maxDate, d2)).toBe(true);
    expect(maxDateAndAfter(d2, d2)).toBe(false);
    expect(maxDateAndAfter(undefined, d2)).toBe(false);
  });
});

describe('minDateAndBefore', () => {
  test('minDateAndBefore should return true if minDate is exist and date < minDate', () => {
    const d1 = newDate(2022, 10, 21);
    const d2 = newDate(2022, 10, 30);
    const minDate = newDate(2022, 10, 23);

    expect(minDateAndBefore(minDate, d1)).toBe(true);
    expect(minDateAndBefore(minDate, d2)).toBe(false);
    expect(minDateAndBefore(d2, d2)).toBe(false);
    expect(minDateAndBefore(undefined, d1)).toBe(false);
  });
});

describe('includeDate', () => {
  test('should return true if dates present in array dates', () => {
    const selected = [
      newDate(2023, 1, 3),
      newDate(2023, 1, 4),
      newDate(2023, 1, 5),
    ];

    expect(includeDate(selected, newDate(2023, 1, 3))).toBe(true);
    expect(includeDate(selected, newDate(2023, 1, 4))).toBe(true);
    expect(includeDate(selected, newDate(2023, 1, 5))).toBe(true);
  });

  test('should return false if dates is not present in array dates', () => {
    const selected = [
      newDate(2023, 1, 3),
      newDate(2023, 1, 4),
      newDate(2023, 1, 5),
    ];

    expect(includeDate(selected, newDate(2023, 1, 6))).toBe(false);
    expect(includeDate(selected, newDate(2023, 2, 7))).toBe(false);
    expect(includeDate(selected, newDate(2024, 1, 8))).toBe(false);
  });
});

describe('isBeforeMinMonth', () => {
  test('should return false if minMonth is not exist', () => {
    expect(isBeforeMinMonth(1)).toBe(false);
  });

  test('should return true if month < minMonth', () => {
    const minMonth = newDate(2023, 1, 1);
    expect(isBeforeMinMonth(0, minMonth)).toBe(true);
    expect(isBeforeMinMonth(1, minMonth)).toBe(false);
    expect(isBeforeMinMonth(2, minMonth)).toBe(false);
  });
});

describe('isBeforeMinYear', () => {
  test('should return false if minYear is not exist', () => {
    expect(isBeforeMinYear(2024)).toBe(false);
  });

  test('should return true if year < minYear', () => {
    const minYear = newDate(2023, 1, 1);
    expect(isBeforeMinYear(2022, minYear)).toBe(true);
    expect(isBeforeMinYear(2023, minYear)).toBe(false);
    expect(isBeforeMinYear(2024, minYear)).toBe(false);
  });
});

describe('isAfterMaxMonth', () => {
  test('should return false if maxMonth is not exist', () => {
    expect(isAfterMaxMonth(1)).toBe(false);
  });

  test('should return true if month > maxMonth', () => {
    const maxMonth = newDate(2023, 1, 1);
    expect(isAfterMaxMonth(0, maxMonth)).toBe(false);
    expect(isAfterMaxMonth(1, maxMonth)).toBe(false);
    expect(isAfterMaxMonth(2, maxMonth)).toBe(true);
  });
});

describe('isAfterMaxYear', () => {
  test('should return false if maxYear is not exist', () => {
    expect(isAfterMaxYear(2022)).toBe(false);
  });

  test('should return true if year > maxYear', () => {
    const maxYear = newDate(2023, 1, 1);
    expect(isAfterMaxYear(2022, maxYear)).toBe(false);
    expect(isAfterMaxYear(2023, maxYear)).toBe(false);
    expect(isAfterMaxYear(2024, maxYear)).toBe(true);
  });
});
