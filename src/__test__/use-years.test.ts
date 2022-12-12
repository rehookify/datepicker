import { describe, test, expect } from '@jest/globals';
import { act, renderHook } from '@testing-library/react';

import { useDatePickerState } from '../use-date-picker-state';
import { useYears, useYearsPropGetters, useYearsActions } from '../use-years';
import { createYears } from '../utils/create-years';
import { getDateParts } from '../utils/date';

describe('useYears', () => {
  test('useMonths should return correct years list', () => {
    const { result: stateResult } = renderHook(() => useDatePickerState());
    const { result: monthResult } = renderHook(() =>
      useYears(stateResult.current[0]),
    );

    const { offsetDate, offsetYear, selectedDates, config } =
      stateResult.current[0];
    const { years, dates } = config;

    const calendarYears = createYears(
      offsetYear,
      offsetDate,
      selectedDates,
      years,
      dates,
    );

    expect(monthResult.current.years).toEqual(calendarYears);
  });
});

describe('useYearsPropGetters', () => {
  test('yearButton should set year correctly', () => {
    const { result: stateResult } = renderHook(() => useDatePickerState());
    const [state, dispatch] = stateResult.current;
    const { result: yearsResult } = renderHook(() => useYears(state));
    const { result: yResult } = renderHook(() =>
      useYearsPropGetters(state, dispatch),
    );

    const nextYear = yearsResult.current.years[0].value;
    const { onClick } = yResult.current.yearButton(
      yearsResult.current.years[0],
    );

    // @ts-ignore-next-line
    act(() => onClick());
    expect(stateResult.current[0].offsetDate.getFullYear()).toEqual(nextYear);
  });

  test('previousYearsButton: should move years pagination one step backward', () => {
    const { result: stateResult } = renderHook(() => useDatePickerState());
    const [state, dispatch] = stateResult.current;
    const { years } = state.config;
    const { result: yResult } = renderHook(() =>
      useYearsPropGetters(state, dispatch),
    );

    const currentYear = stateResult.current[0].offsetYear;

    const { onClick } = yResult.current.previousYearsButton();

    // @ts-ignore-next-line
    act(() => onClick());
    expect(stateResult.current[0].offsetYear).toEqual(currentYear - years.step);
  });

  test('nextYearsButton: should move years pagination step forward', () => {
    const { result: stateResult } = renderHook(() => useDatePickerState());
    const [state, dispatch] = stateResult.current;
    const { years } = state.config;
    const { result: yResult } = renderHook(() =>
      useYearsPropGetters(state, dispatch),
    );

    const currentYear = stateResult.current[0].offsetYear;

    const { onClick } = yResult.current.nextYearsButton();

    // @ts-ignore-next-line
    act(() => onClick());
    expect(stateResult.current[0].offsetYear).toEqual(currentYear + years.step);
  });
});

describe('useYearsAction', () => {
  test('setYears should set correct year', () => {
    const { result: stateResult } = renderHook(() => useDatePickerState());
    const [state, dispatch] = stateResult.current;
    const { result: yResult } = renderHook(() =>
      useYearsActions(state, dispatch),
    );

    const { Y, M, D } = getDateParts(stateResult.current[0].offsetDate);
    const { setYear } = yResult.current;

    act(() => setYear(new Date(Y + 3, M, D)));
    expect(stateResult.current[0].offsetDate.getFullYear()).toBe(Y + 3);
  });

  test('setPreviousYears: should move years pagination one step backward', () => {
    const { result: stateResult } = renderHook(() => useDatePickerState());
    const [state, dispatch] = stateResult.current;
    const { result: mResult } = renderHook(() =>
      useYearsActions(state, dispatch),
    );

    const currentYear = stateResult.current[0].offsetYear;
    const { setPreviousYears } = mResult.current;

    act(() => setPreviousYears());
    expect(stateResult.current[0].offsetYear).toBe(
      currentYear - stateResult.current[0].config.years.step,
    );
  });

  test('setNextYears: should move years pagination one step forward', () => {
    const { result: stateResult } = renderHook(() => useDatePickerState());
    const [state, dispatch] = stateResult.current;
    const { result: mResult } = renderHook(() =>
      useYearsActions(state, dispatch),
    );

    const currentYear = stateResult.current[0].offsetYear;
    const { setNextYears } = mResult.current;

    act(() => setNextYears());
    expect(stateResult.current[0].offsetYear).toBe(
      currentYear + stateResult.current[0].config.years.step,
    );
  });
});
