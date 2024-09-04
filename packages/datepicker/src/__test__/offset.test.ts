import { act, renderHook } from '@testing-library/react';
import { useState } from 'react';
import { describe, expect, test, vi } from 'vitest';

import { useDatePickerState } from '../use-date-picker-state';
import { getCleanDate, newDate, subtractFromDate } from '../utils/date';
import {
  getEdgedOffsetDate,
  getNextOffsetDate,
  setDPOffset,
} from '../utils/offset';

describe('setDPOffset', () => {
  test('should set offset without onOffsetChange', () => {
    const d = getCleanDate(newDate(2022, 11, 11));
    const { result } = renderHook(() =>
      useDatePickerState({
        selectedDates: [],
        onDatesChange: vi.fn(),
      }),
    );

    act(() => setDPOffset(result.current)(d));
    expect(result.current.offsetDate).toEqual(d);
  });

  test('should set offset with onOffsetChange', () => {
    const d = getCleanDate(newDate(2022, 11, 11));
    const d1 = newDate();
    const { result: offsetResult } = renderHook(() => useState(d1));
    const { result } = renderHook(() =>
      useDatePickerState({
        selectedDates: [],
        onDatesChange: vi.fn(),
        offsetDate: offsetResult.current[0],
        onOffsetChange: offsetResult.current[1],
      }),
    );

    act(() => setDPOffset(result.current)(d));

    expect(offsetResult.current[0]).toEqual(d);
    expect(result.current.offsetDate).toEqual(d1);
  });
});

describe('getNextOffsetDate', () => {
  test('should add offset correctly', () => {
    const d = getCleanDate(newDate(2022, 11, 11));

    const testResult1 = getNextOffsetDate(d, { days: 21, months: 0, years: 0 });
    expect(testResult1).toEqual(getCleanDate(newDate(2023, 0, 1)));

    const testResult2 = getNextOffsetDate(d, { days: 0, months: 1, years: 0 });
    expect(testResult2).toEqual(getCleanDate(newDate(2023, 0, 11)));

    const testResult3 = getNextOffsetDate(d, { days: 0, months: 0, years: 1 });
    expect(testResult3).toEqual(getCleanDate(newDate(2023, 11, 11)));

    const testResult4 = getNextOffsetDate(d, { days: 1, months: 1, years: 1 });
    expect(testResult4).toEqual(getCleanDate(newDate(2024, 0, 12)));
  });

  test('should subtract offset correctly', () => {
    const d = getCleanDate(newDate(2022, 11, 11));

    const testResult1 = getNextOffsetDate(d, {
      days: -11,
      months: 0,
      years: 0,
    });
    expect(testResult1).toEqual(getCleanDate(newDate(2022, 10, 30)));

    const testResult2 = getNextOffsetDate(d, { days: 0, months: -1, years: 0 });
    expect(testResult2).toEqual(getCleanDate(newDate(2022, 10, 11)));

    const testResult3 = getNextOffsetDate(d, { days: 0, months: 0, years: -1 });
    expect(testResult3).toEqual(getCleanDate(newDate(2021, 11, 11)));

    const testResult4 = getNextOffsetDate(d, {
      days: -11,
      months: -11,
      years: -1,
    });
    expect(testResult4).toEqual(getCleanDate(newDate(2020, 11, 30)));
  });
});

describe('getEdgedOffsetDate', () => {
  test('should return offsetDate when dateEdge is not provided', () => {
    const offsetDate = newDate(2022, 11, 11);
    const result = getEdgedOffsetDate(offsetDate, {
      days: 0,
      months: 0,
      years: 0,
    });
    expect(result).toEqual(offsetDate);
  });

  test('should return offsetDate when offsetDate and dateEdge are the same', () => {
    const offsetDate = newDate(2022, 11, 11);
    const dateEdge = newDate(2022, 11, 11);
    const result = getEdgedOffsetDate(
      offsetDate,
      { days: 0, months: 0, years: 0 },
      dateEdge,
    );
    expect(result).toEqual(offsetDate);
  });

  test('should return offsetDate when days, months, and years are all zero', () => {
    const offsetDate = newDate(2022, 11, 11);
    const dateEdge = newDate(2022, 11, 12);
    const result = getEdgedOffsetDate(
      offsetDate,
      { days: 0, months: 0, years: 0 },
      dateEdge,
    );
    expect(result).toEqual(offsetDate);
  });

  test('should return date edge - offsetValue if the offset date + offsetValue is greater then max edge', () => {
    const offsetDate = newDate(2022, 11, 11);
    const offsetValue = { days: 0, months: 1, years: 0 };
    const maxDateEdge = newDate(2022, 11, 12);
    const result = getEdgedOffsetDate(offsetDate, offsetValue, maxDateEdge);
    const expectedDate = subtractFromDate(
      maxDateEdge,
      offsetValue.months,
      'month',
    );
    expect(result).toEqual(expectedDate);
  });

  test('should return date edge - offsetValue if the offset date + offsetValue is greater then min edge', () => {
    const offsetDate = newDate(2022, 11, 11);
    const offsetValue = { days: 0, months: -1, years: 0 };
    const minDateEdge = newDate(2022, 10, 12);
    const result = getEdgedOffsetDate(offsetDate, offsetValue, minDateEdge);
    const expectedDate = subtractFromDate(
      minDateEdge,
      offsetValue.months,
      'month',
    );
    expect(result).toEqual(expectedDate);
  });
});
