import { describe, test, expect } from '@jest/globals';
import { getCalendarMonthParams } from '../utils/get-calendar-month-params';

describe('getCalendarMonthParams', () => {
  const d1 = new Date(2023, 0, 1);
  const year = d1.getFullYear();
  const month = d1.getMonth();

  test('getCalendarMonthParams should return correct data in static mode', () => {
    expect(getCalendarMonthParams(0, month, year, 'static')).toEqual({
      startOffset: 0,
      numberOfDays: 42,
    });
  });

  test('getCalendarMonthParams should return correct data in fluid mode', () => {
    expect(getCalendarMonthParams(0, month, year, 'fluid')).toEqual({
      startOffset: 0,
      numberOfDays: 35,
    });
  });
});
