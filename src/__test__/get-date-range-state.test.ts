import { describe, test, expect } from '@jest/globals';
import { getCleanDate } from '../utils/date';
import { getDateRangeState } from '../utils/get-date-range-state';

describe('getDateRangeState', () => {
  // We have 2 selected dates and should test for range-state
  const selectedDates1 = [new Date(2022, 10, 20), new Date(2022, 10, 24)];
  test('should return in-range', () => {
    const d1 = new Date(2022, 10, 22);

    expect(getDateRangeState(d1, null, selectedDates1, 'range')).toBe(
      'in-range',
    );
  });

  test('should return range-start', () => {
    expect(
      getDateRangeState(selectedDates1[0], null, selectedDates1, 'range'),
    ).toBe('range-start');
  });

  test('should return range-end', () => {
    expect(
      getDateRangeState(selectedDates1[1], null, selectedDates1, 'range'),
    ).toBe('range-end');
  });

  test('should return range-start range-end', () => {
    const d = getCleanDate(new Date());

    expect(getDateRangeState(d, null, [d, d], 'range')).toBe(
      'range-start range-end',
    );
  });

  test('should return empty string', () => {
    const d1 = new Date(2022, 10, 18);
    expect(getDateRangeState(d1, null, selectedDates1, 'range')).toBe('');

    const d2 = new Date(2022, 10, 26);
    expect(getDateRangeState(d2, null, selectedDates1, 'range')).toBe('');
  });

  // We have only 1 selected date and rangeEnd date
  const selectedDates2 = [new Date(2022, 20, 20)];
  test('should return will-be-in-range', () => {
    const d1 = new Date(2022, 20, 22);
    const rangeEnd = new Date(2022, 20, 24);
    expect(getDateRangeState(d1, rangeEnd, selectedDates2, 'range')).toBe(
      'will-be-in-range',
    );

    const d2 = new Date(2022, 20, 18);
    const rangeEnd2 = new Date(2022, 20, 16);
    expect(getDateRangeState(d2, rangeEnd2, selectedDates2, 'range')).toBe(
      'will-be-in-range',
    );
  });

  // rangeEnd > selectedDates[0]
  test('should return will-be-range-start', () => {
    const rangeEnd = new Date(2022, 20, 22);
    expect(
      getDateRangeState(selectedDates2[0], rangeEnd, selectedDates2, 'range'),
    ).toBe('will-be-range-start');
  });

  test('should return will-be-range-end', () => {
    const rangeEnd = new Date(2022, 20, 22);
    expect(getDateRangeState(rangeEnd, rangeEnd, selectedDates2, 'range')).toBe(
      'will-be-range-end',
    );
  });

  // rangeEnd < selectedDates[0]
  test('should return will-be-in-range-start', () => {
    const rangeEnd = new Date(2022, 20, 18);
    expect(
      getDateRangeState(selectedDates2[0], rangeEnd, selectedDates2, 'range'),
    ).toBe('will-be-range-end');
  });

  test('should return will-be-in-range-end', () => {
    const rangeEnd = new Date(2022, 20, 18);
    expect(getDateRangeState(rangeEnd, rangeEnd, selectedDates2, 'range')).toBe(
      'will-be-range-start',
    );
  });

  test('should return empty string', () => {
    const rangeEnd = new Date(2022, 20, 22);
    const d1 = new Date(2022, 20, 18); // smaller than selectedDates2[0]
    const d2 = new Date(2022, 20, 24); // bigger than rangeEnd;

    expect(getDateRangeState(d1, rangeEnd, selectedDates2, 'range')).toBe('');
    expect(getDateRangeState(d2, rangeEnd, selectedDates2, 'range')).toBe('');
  });
});
