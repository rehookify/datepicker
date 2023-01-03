import { describe, test, expect } from '@jest/globals';
import { act, renderHook } from '@testing-library/react';

import { useDatePickerState } from '../use-date-picker-state';
import {
  useMonths,
  useMonthsPropGetters,
  useMonthsActions,
} from '../use-months';
import { createMonths } from '../utils/create-months';
import { getDateParts } from '../utils/date';

// Test Month data
describe('useMonths', () => {
  test('useMonths should return correct months list', () => {
    const { result: stateResult } = renderHook(() => useDatePickerState());
    const { result: monthResult } = renderHook(() =>
      useMonths(stateResult.current[0]),
    );

    const { offsetDate, selectedDates, config } = stateResult.current[0];
    const { locale, dates } = config;

    const months = createMonths(offsetDate, selectedDates, locale, dates);

    expect(monthResult.current.months).toEqual(months);
  });
});

// Test Month prop-getters
describe('useMonthPropGetters', () => {
  test('monthButton should set months correctly', () => {
    const { result: stateResult } = renderHook(() => useDatePickerState());
    const [state, dispatch] = stateResult.current;
    const { result: monthResult } = renderHook(() => useMonths(state));
    const { result: mResult } = renderHook(() =>
      useMonthsPropGetters(state, dispatch),
    );

    const { onClick } = mResult.current.monthButton(
      monthResult.current.months[0],
    );

    // @ts-ignore-next-line
    act(() => onClick());
    expect(stateResult.current[0].offsetDate.getMonth()).toEqual(
      monthResult.current.months[0].$date.getMonth(),
    );
  });

  test('previousMonthButton should set previous month', () => {
    const { result: stateResult } = renderHook(() => useDatePickerState());
    const [state, dispatch] = stateResult.current;
    const { result: mResult } = renderHook(() =>
      useMonthsPropGetters(state, dispatch),
    );

    const { Y, M, D } = getDateParts(stateResult.current[0].offsetDate);

    const { onClick } = mResult.current.previousMonthButton();

    // @ts-ignore-next-line
    act(() => onClick());
    expect(stateResult.current[0].offsetDate.getMonth()).toEqual(
      new Date(Y, M - 1, D).getMonth(),
    );
  });

  test('nextMonthButton should set next month', () => {
    const { result: stateResult } = renderHook(() => useDatePickerState());
    const [state, dispatch] = stateResult.current;
    const { result: mResult } = renderHook(() =>
      useMonthsPropGetters(state, dispatch),
    );

    const { Y, M, D } = getDateParts(stateResult.current[0].offsetDate);

    const { onClick } = mResult.current.nextMonthButton();

    // @ts-ignore-next-line
    act(() => onClick());
    expect(stateResult.current[0].offsetDate.getMonth()).toEqual(
      new Date(Y, M + 1, D).getMonth(),
    );
  });
});

// Test Month actions
describe('useMonthsAction', () => {
  test('setMonth should set correct month', () => {
    const { result: stateResult } = renderHook(() => useDatePickerState());
    const [state, dispatch] = stateResult.current;
    const { result: mResult } = renderHook(() =>
      useMonthsActions(state, dispatch),
    );
    const { setMonth } = mResult.current;

    const { Y, M, D } = getDateParts(new Date());
    const nextDate = new Date(Y, M - 3, D);

    act(() => setMonth(nextDate));
    expect(stateResult.current[0].offsetDate.getMonth()).toBe(
      nextDate.getMonth(),
    );
  });

  test('setPreviousMonth should set previous month', () => {
    const { result: stateResult } = renderHook(() => useDatePickerState());
    const [state, dispatch] = stateResult.current;
    const { result: mResult } = renderHook(() =>
      useMonthsActions(state, dispatch),
    );
    const { setPreviousMonth } = mResult.current;

    const { Y, M, D } = getDateParts(stateResult.current[0].offsetDate);

    act(() => setPreviousMonth());
    expect(stateResult.current[0].offsetDate.getMonth()).toBe(
      new Date(Y, M - 1, D).getMonth(),
    );
  });

  test('setNextMonth should set next month', () => {
    const { result: stateResult } = renderHook(() => useDatePickerState());
    const [state, dispatch] = stateResult.current;
    const { result: mResult } = renderHook(() =>
      useMonthsActions(state, dispatch),
    );
    const { setNextMonth } = mResult.current;

    const { Y, M, D } = getDateParts(stateResult.current[0].offsetDate);

    act(() => setNextMonth());
    expect(stateResult.current[0].offsetDate.getMonth()).toBe(
      new Date(Y, M + 1, D).getMonth(),
    );
  });
});
