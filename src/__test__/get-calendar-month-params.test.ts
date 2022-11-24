import { describe, test, expect } from '@jest/globals';
import { getCalendarMonthParams } from '../utils/get-calendar-month-params';

describe('getCalendarMonthParams', () => {
  const d1 = new Date(2022, 10, 24);
  const year = d1.getFullYear();
  const month = d1.getMonth();

  test('getCalendarMonthParams should return correct data in static mode', () => {
    expect(getCalendarMonthParams(month, year, 'static')).toEqual({
      firstDayOffset: 1,
      numberOfDaysToDisplay: 42,
    });
  });

  test('getCalendarMonthParams should return correct data in fluid mode', () => {
    expect(getCalendarMonthParams(month, year, 'fluid')).toEqual({
      firstDayOffset: 1,
      numberOfDaysToDisplay: 35,
    });
  });
});
