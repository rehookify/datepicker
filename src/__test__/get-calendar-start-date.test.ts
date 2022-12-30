import { describe, test, expect } from '@jest/globals';
import { getCleanDate, getDateParts } from '../utils/date';
import { getCalendarStartDate } from '../utils/get-calendar-start-date';

describe('getCalendarStartDate', () => {
  test('getCalendarStartDate returns minDate if minDate > now', () => {
    const now = getCleanDate(new Date());
    const { Y, M, D } = getDateParts(now);
    const minDate = new Date(Y, M, D + 2);

    const currentDate = getCalendarStartDate(minDate, null, now);

    expect(currentDate).toEqual(minDate);
  });

  test('getCalendarStartDate returns maxDate if maxDate < now', () => {
    const now = getCleanDate(new Date());
    const { Y, M, D } = getDateParts(now);
    const maxDate = new Date(Y, M, D - 2);

    const currentDate = getCalendarStartDate(null, maxDate, now);

    expect(currentDate).toEqual(maxDate);
  });

  test('getCalendarStartDate returns now if minDate < now < maxDate', () => {
    const now = getCleanDate(new Date());
    const { Y, M, D } = getDateParts(now);
    const maxDate = new Date(Y + 1, M, D);
    const minDate = new Date(Y - 1, M, D);

    const currentDate = getCalendarStartDate(minDate, maxDate, now);

    expect(currentDate).toEqual(now);
  });
});
