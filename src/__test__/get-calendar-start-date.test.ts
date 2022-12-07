import { describe, test, expect } from '@jest/globals';
import { getCalendarStartDate } from '../utils/get-calendar-start-date';

describe('getCalendarStartDate', () => {
  test('getCalendarStartDate returns minDate', () => {
    const nowDate = new Date(2020, 10, 20);
    const minDate = new Date(2021, 10, 20);

    const currentDate = getCalendarStartDate(minDate, null, nowDate);

    expect(currentDate).toEqual(minDate);
  });

  test('getCalendarStartDate returns maxDate', () => {
    const nowDate = new Date(2022, 10, 20);
    const maxDate = new Date(2021, 10, 20);

    const currentDate = getCalendarStartDate(null, maxDate, nowDate);

    expect(currentDate).toEqual(maxDate);
  });

  test('getCalendarStartDate returns now', () => {
    const nowDate = new Date(2022, 10, 20);
    const maxDate = new Date(2023, 10, 20);
    const minDate = new Date(2021, 10, 20);

    const currentDate = getCalendarStartDate(minDate, maxDate, nowDate);

    expect(currentDate).toEqual(nowDate);
  });
});
