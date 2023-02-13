import { describe, expect, test } from '@jest/globals';
import { act, renderHook } from '@testing-library/react';
import { useState } from 'react';

import { useCalendars } from '../use-calendars';
import { useDatePickerState } from '../use-date-picker-state';
import { useDaysPropGetters } from '../use-days';
import { useTime, useTimePropGetter } from '../use-time';

describe('useTime', () => {
  test('should return correct time array', () => {
    const { result: stateResult } = renderHook(() => useDatePickerState());
    const { result: timeResult } = renderHook(() =>
      useTime(stateResult.current),
    );

    expect(timeResult.current.time.length).toBe(48);
  });
});

describe('useTimePropGetters', () => {
  test('timeButton should select time correctly', () => {
    const { result: state } = renderHook(() => useState<Date[]>([]));
    const { result: stateResult, rerender: stateRerender } = renderHook(() =>
      useDatePickerState({
        selectedDates: state.current[0],
        onDatesChange: state.current[1],
      }),
    );
    const { result: calendarsResult } = renderHook(() =>
      useCalendars(stateResult.current),
    );
    const { result: dayButtonResult } = renderHook(() =>
      useDaysPropGetters(stateResult.current),
    );
    const { result: timeResult, rerender: timeRerender } = renderHook(() =>
      useTime(stateResult.current),
    );
    const { result: timeButtonResult, rerender: timeButtonRerender } =
      renderHook(() => useTimePropGetter(stateResult.current));

    const { onClick } = dayButtonResult.current.dayButton(
      calendarsResult.current.calendars[0].days[9],
    );

    // @ts-ignore-next-line
    act(() => onClick());

    // Rerender hooks because they depends on the selectedDates
    stateRerender();
    timeRerender();
    timeButtonRerender();

    const t = timeResult.current.time[11];

    const { onClick: onTimeClick } = timeButtonResult.current.timeButton(t);
    // @ts-ignore-next-line
    act(() => onTimeClick());

    expect(state.current[0]).toEqual([t.$date]);
  });
});
