import { act, renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { useDatePickerState } from '../use-date-picker-state';
import {
  useMonths,
  useMonthsActions,
  useMonthsPropGetters,
} from '../use-months';
import { createMonths } from '../utils/create-months';
import {
  addToDate,
  getDateParts,
  newDate,
  subtractFromDate,
} from '../utils/date';

// Test Month data
describe('useMonths', () => {
  test('useMonths should return correct months list', () => {
    const { result: stateResult } = renderHook(() => useDatePickerState());
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
    const { result: stateResult } = renderHook(() => useDatePickerState());
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

  test('previousMonthButton should set previous month', () => {
    const { result: stateResult } = renderHook(() => useDatePickerState());
    const { result: mResult, rerender } = renderHook(() =>
      useMonthsPropGetters(stateResult.current),
    );

    const { Y, M, D } = getDateParts(stateResult.current.state.offsetDate);
    const startDate = newDate(Y, M, D);

    const { onClick } = mResult.current.previousMonthButton();

    // @ts-ignore-next-line
    act(() => onClick());

    expect(stateResult.current.state.offsetDate.getMonth()).toEqual(
      subtractFromDate(startDate, 1, 'month').getMonth(),
    );

    // We need rerender to get fresh offsetDate to the useMonthsPropGetters
    rerender();

    // should move 3 months back
    const { onClick: onQuarterBack } = mResult.current.previousMonthButton({
      step: 3,
    });

    // @ts-ignore-next-line
    act(() => onQuarterBack());

    expect(stateResult.current.state.offsetDate.getMonth()).toEqual(
      subtractFromDate(startDate, 4, 'month').getMonth(),
    );
  });

  test('nextMonthButton should set next month', () => {
    const { result: stateResult } = renderHook(() => useDatePickerState());
    const { result: mResult, rerender } = renderHook(() =>
      useMonthsPropGetters(stateResult.current),
    );

    const { Y, M, D } = getDateParts(stateResult.current.state.offsetDate);
    const startDate = newDate(Y, M, D);

    const { onClick } = mResult.current.nextMonthButton();

    // @ts-ignore-next-line
    act(() => onClick());
    expect(stateResult.current.state.offsetDate.getMonth()).toEqual(
      addToDate(startDate, 1, 'month').getMonth(),
    );

    // We need rerender to get fresh offsetDate to the useMonthsPropGetters
    rerender();

    // should move 3 months forward
    const { onClick: onQuarterForward } = mResult.current.nextMonthButton({
      step: 3,
    });

    // @ts-ignore-next-line
    act(() => onQuarterForward());
    expect(stateResult.current.state.offsetDate.getMonth()).toEqual(
      addToDate(startDate, 4, 'month').getMonth(),
    );
  });
});

// Test Month actions
describe('useMonthsAction', () => {
  test('setMonth should set correct month', () => {
    const { result: stateResult } = renderHook(() => useDatePickerState());
    const { result: mResult } = renderHook(() =>
      useMonthsActions(stateResult.current),
    );
    const { setMonth } = mResult.current;

    const { Y, M, D } = getDateParts(newDate());
    const nextDate = newDate(Y, M - 3, D);

    act(() => setMonth(nextDate));
    expect(stateResult.current.state.offsetDate.getMonth()).toBe(
      nextDate.getMonth(),
    );
  });

  test('setPreviousMonth should set previous month', () => {
    const { result: stateResult } = renderHook(() => useDatePickerState());
    const { result: mResult } = renderHook(() =>
      useMonthsActions(stateResult.current),
    );
    const { setPreviousMonth } = mResult.current;

    const { Y, M, D } = getDateParts(stateResult.current.state.offsetDate);

    act(() => setPreviousMonth());
    expect(stateResult.current.state.offsetDate.getMonth()).toBe(
      subtractFromDate(newDate(Y, M, D), 1, 'month').getMonth(),
    );
  });

  test('setNextMonth should set next month', () => {
    const { result: stateResult } = renderHook(() => useDatePickerState());
    const { result: mResult } = renderHook(() =>
      useMonthsActions(stateResult.current),
    );
    const { setNextMonth } = mResult.current;

    const { Y, M, D } = getDateParts(stateResult.current.state.offsetDate);

    act(() => setNextMonth());
    expect(stateResult.current.state.offsetDate.getMonth()).toBe(
      addToDate(newDate(Y, M, D), 1, 'month').getMonth(),
    );
  });
});
