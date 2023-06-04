import { act, renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { INITIAL_STATE } from '../__mock__/initial-state';
import { setOffset, setRangeEnd, setYear } from '../state-reducer';
import { useDatePickerState } from '../use-date-picker-state';
import { getDateParts, newDate } from '../utils/date';
import { getCurrentYearPosition } from '../utils/get-current-year-position';

describe('useDatePickerState', () => {
  test('useDatePickerState should return correct initial state', () => {
    const { result } = renderHook(() => useDatePickerState());

    expect(result.current.state).toEqual(INITIAL_STATE);
  });

  test('useDatePickerState should set offset correctly', () => {
    const { result } = renderHook(() => useDatePickerState());

    const { dispatch } = result.current;
    const { Y, M, D } = getDateParts(newDate());
    const d = newDate(Y + 1, M + 1, D);

    act(() => setOffset(dispatch, d));
    expect(result.current.state.offsetDate).toEqual(d);
    expect(result.current.state.offsetYear).toBe(
      getCurrentYearPosition(Y + 1, result.current.config.years),
    );
  });

  test('useDatePickerState should set offsetYear correctly', () => {
    const { result } = renderHook(() => useDatePickerState());

    const { dispatch } = result.current;
    const { Y } = getDateParts(newDate());

    act(() => setYear(dispatch, Y + 10));
    expect(result.current.state.offsetYear).toBe(Y + 10);
  });

  test('useDatePickerState should set offsetYear correctly', () => {
    const { result } = renderHook(() => useDatePickerState());

    const { dispatch } = result.current;
    const { Y } = getDateParts(newDate());

    act(() => setYear(dispatch, Y + 10));
    expect(result.current.state.offsetYear).toBe(Y + 10);
  });

  test('useDatePickerState should set rangeEnd correctly', () => {
    const { result } = renderHook(() => useDatePickerState());

    const { dispatch } = result.current;
    const d = newDate();

    act(() => setRangeEnd(dispatch, d));
    expect(result.current.state.rangeEnd).toEqual(d);
  });
});
