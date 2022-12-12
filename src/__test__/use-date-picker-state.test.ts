import { describe, test, expect } from '@jest/globals';
import { renderHook, act } from '@testing-library/react';
import { useDatePickerState } from '../use-date-picker-state';
import { selectDates, setOffset, setRangeEnd, setYear } from '../state-reducer';
import { INITIAL_STATE } from '../__mock__/initial-state';
import { getDateParts } from '../utils/date';
import { getCurrentYearPosition } from '../utils/get-current-year-position';

describe('useDatePickerState', () => {
  test('useDatePickerState should return correct initial state', () => {
    const { result } = renderHook(() => useDatePickerState());

    expect(result.current[0]).toEqual(INITIAL_STATE);
  });

  test('useDatePickerState should set selectedDates correctly', () => {
    const { result } = renderHook(() => useDatePickerState());

    const [, dispatch] = result.current;
    const d = new Date();

    act(() => selectDates(dispatch, d));
    expect(result.current[0].selectedDates).toEqual([d]);
  });

  test('useDatePickerState should set offset correctly', () => {
    const { result } = renderHook(() => useDatePickerState());

    const [, dispatch] = result.current;
    const { Y, M, D } = getDateParts(new Date());
    const d = new Date(Y + 1, M + 1, D);

    act(() => setOffset(dispatch, d));
    expect(result.current[0].offsetDate).toEqual(d);
    expect(result.current[0].offsetYear).toBe(
      getCurrentYearPosition(Y + 1, result.current[0].config.years),
    );
  });

  test('useDatePickerState should set offsetYear correctly', () => {
    const { result } = renderHook(() => useDatePickerState());

    const [, dispatch] = result.current;
    const { Y } = getDateParts(new Date());

    act(() => setYear(dispatch, Y + 10));
    expect(result.current[0].offsetYear).toBe(Y + 10);
  });

  test('useDatePickerState should set offsetYear correctly', () => {
    const { result } = renderHook(() => useDatePickerState());

    const [, dispatch] = result.current;
    const { Y } = getDateParts(new Date());

    act(() => setYear(dispatch, Y + 10));
    expect(result.current[0].offsetYear).toBe(Y + 10);
  });

  test('useDatePickerState should set rangeEnd correctly', () => {
    const { result } = renderHook(() => useDatePickerState());

    const [, dispatch] = result.current;
    const d = new Date();

    act(() => setRangeEnd(dispatch, d));
    expect(result.current[0].rangeEnd).toEqual(d);
  });
});
