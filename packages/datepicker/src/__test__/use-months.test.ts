import { act, renderHook } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import { useDatePickerState } from '../use-date-picker-state';
import { useMonths, useMonthsPropGetters } from '../use-months';
import { createMonths } from '../utils/create-months';

// Test Month data
describe('useMonths', () => {
  test('useMonths should return correct months list', () => {
    const { result: stateResult } = renderHook(() =>
      useDatePickerState({
        selectedDates: [],
        onDatesChange: vi.fn(),
      }),
    );
    const { result: monthResult } = renderHook(() =>
      useMonths(stateResult.current),
    );

    const {
      selectedDates,
      state: { offsetDate },
      config: { locale, dates },
    } = stateResult.current;

    const months = createMonths(offsetDate, selectedDates, locale, dates);

    expect(monthResult.current.months).toEqual(months);
  });
});

// Test Month prop-getters
describe('useMonthPropGetters', () => {
  test('monthButton should set months correctly', () => {
    const { result: stateResult } = renderHook(() =>
      useDatePickerState({ selectedDates: [], onDatesChange: vi.fn() }),
    );
    const { result: monthResult } = renderHook(() =>
      useMonths(stateResult.current),
    );
    const { result: mResult } = renderHook(() =>
      useMonthsPropGetters(stateResult.current),
    );

    const { onClick } = mResult.current.monthButton(
      monthResult.current.months[0],
    );

    // @ts-ignore-next-line
    act(() => onClick());
    expect(stateResult.current.state.offsetDate.getMonth()).toEqual(
      monthResult.current.months[0].$date.getMonth(),
    );
  });
});
