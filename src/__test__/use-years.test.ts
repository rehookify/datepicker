import { act, renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { useDatePickerState } from '../use-date-picker-state';
import { useYears, useYearsActions, useYearsPropGetters } from '../use-years';
import { createYears } from '../utils/create-years';
import { getDateParts, newDate } from '../utils/date';

describe('useYears', () => {
  test('useMonths should return correct years list', () => {
    const { result: stateResult } = renderHook(() => useDatePickerState());
    const { result: monthResult } = renderHook(() =>
      useYears(stateResult.current),
    );

    const {
      selectedDates,
      state: { offsetDate, offsetYear },
      config,
    } = stateResult.current;
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
    const { result: yearsResult } = renderHook(() =>
      useYears(stateResult.current),
    );
    const { result: yResult } = renderHook(() =>
      useYearsPropGetters(stateResult.current),
    );

    const nextYear = yearsResult.current.years[0].year;
    const { onClick } = yResult.current.yearButton(
      yearsResult.current.years[0],
    );

    // @ts-ignore-next-line
    act(() => onClick());
    expect(stateResult.current.state.offsetDate.getFullYear()).toEqual(
      nextYear,
    );
  });

  test('previousYearsButton: should move years pagination one step backward', () => {
    const { result: stateResult } = renderHook(() => useDatePickerState());
    const { years } = stateResult.current.config;
    const { result: yResult } = renderHook(() =>
      useYearsPropGetters(stateResult.current),
    );

    const currentYear = stateResult.current.state.offsetYear;

    const { onClick } = yResult.current.previousYearsButton();

    // @ts-ignore-next-line
    act(() => onClick());
    expect(stateResult.current.state.offsetYear).toEqual(
      currentYear - years.step,
    );
  });

  test('nextYearsButton: should move years pagination step forward', () => {
    const { result: stateResult } = renderHook(() => useDatePickerState());
    const { years } = stateResult.current.config;
    const { result: yResult } = renderHook(() =>
      useYearsPropGetters(stateResult.current),
    );

    const currentYear = stateResult.current.state.offsetYear;

    const { onClick } = yResult.current.nextYearsButton();

    // @ts-ignore-next-line
    act(() => onClick());
    expect(stateResult.current.state.offsetYear).toEqual(
      currentYear + years.step,
    );
  });
});

describe('useYearsAction', () => {
  test('setYears should set correct year', () => {
    const { result: stateResult } = renderHook(() => useDatePickerState());
    const { result: yResult } = renderHook(() =>
      useYearsActions(stateResult.current),
    );

    const { Y, M, D } = getDateParts(stateResult.current.state.offsetDate);
    const { setYear } = yResult.current;

    act(() => setYear(newDate(Y + 3, M, D)));
    expect(stateResult.current.state.offsetDate.getFullYear()).toBe(Y + 3);
  });

  test('setPreviousYears: should move years pagination one step backward', () => {
    const { result: stateResult } = renderHook(() => useDatePickerState());
    const { result: mResult } = renderHook(() =>
      useYearsActions(stateResult.current),
    );

    const currentYear = stateResult.current.state.offsetYear;
    const { setPreviousYears } = mResult.current;

    act(() => setPreviousYears());
    expect(stateResult.current.state.offsetYear).toBe(
      currentYear - stateResult.current.config.years.step,
    );
  });

  test('setNextYears: should move years pagination one step forward', () => {
    const { result: stateResult } = renderHook(() => useDatePickerState());
    const { result: mResult } = renderHook(() =>
      useYearsActions(stateResult.current),
    );

    const currentYear = stateResult.current.state.offsetYear;
    const { setNextYears } = mResult.current;

    act(() => setNextYears());
    expect(stateResult.current.state.offsetYear).toBe(
      currentYear + stateResult.current.config.years.step,
    );
  });
});
