import { act, renderHook } from '@testing-library/react';
import { useState } from 'react';
import { describe, expect, test, vi } from 'vitest';

import { useDatePickerOffsetPropGetters } from '../use-date-picker-offset';
import { useDatePickerState } from '../use-date-picker-state';
import { newDate } from '../utils/date';

describe('useDatePickerOffsetPropGetters', () => {
  test('setOffset: should set correct offsetDate', () => {
    const { result: sResult } = renderHook(() =>
      useDatePickerState({ selectedDates: [], onDatesChange: vi.fn() }),
    );
    const { result: oResult } = renderHook(() =>
      useDatePickerOffsetPropGetters(sResult.current),
    );

    const nextDate = newDate(2020, 1, 1);
    const { onClick } = oResult.current.setOffset(nextDate);

    // @ts-ignore-next-line
    act(() => onClick(nextDate));

    expect(sResult.current.offsetDate).toEqual(nextDate);
  });

  test('addOffset: should set correct offsetDate when offsetDate is null', () => {
    const { result } = renderHook(() => useState(newDate(2023, 6, 18)));
    const { result: sResult, rerender } = renderHook(() =>
      useDatePickerState({
        selectedDates: [],
        onDatesChange: vi.fn(),
        offsetDate: result.current[0],
        onOffsetChange: result.current[1],
      }),
    );

    const { result: oResult } = renderHook(() =>
      useDatePickerOffsetPropGetters(sResult.current),
    );

    const { onClick } = oResult.current.addOffset({ months: 1 });

    // @ts-ignore-next-line
    act(() => onClick());
    rerender();

    expect(sResult.current.offsetDate).toEqual(newDate(2023, 7, 18));
  });

  test('subtractOffset: should set correct offsetDate when offsetDate is null', () => {
    const { result } = renderHook(() => useState(newDate(2023, 6, 18)));
    const { result: sResult, rerender } = renderHook(() =>
      useDatePickerState({
        selectedDates: [],
        onDatesChange: vi.fn(),
        offsetDate: result.current[0],
        onOffsetChange: result.current[1],
      }),
    );

    const { result: oResult } = renderHook(() =>
      useDatePickerOffsetPropGetters(sResult.current),
    );

    const { onClick } = oResult.current.subtractOffset({ months: 1 });

    // @ts-ignore-next-line
    act(() => onClick());
    rerender();

    expect(sResult.current.offsetDate).toEqual(newDate(2023, 5, 18));
  });
});
