import { act, renderHook } from '@testing-library/react';
import { useState } from 'react';
import { describe, expect, test, vi } from 'vitest';

import { useDatePicker } from '../use-date-picker';
import { getDateParts, newDate } from '../utils/date';

describe('useDatePicker', () => {
  test('useDatePicker returns correct selectedDates with default config', () => {
    const { result: state } = renderHook(() => useState<Date[]>([]));
    const { result } = renderHook(() =>
      useDatePicker({
        selectedDates: state.current[0],
        onDatesChange: state.current[1],
      }),
    );

    const d1 = result.current.data.calendars[0].days[1];
    const d2 = result.current.data.calendars[0].days[2];

    // Test date selection by clicking from propGetter
    // @ts-ignore-next-line: we will have onClick here
    act(() => result.current.propGetters.dayButton(d1).onClick());
    expect(state.current[0][0]).toBe(d1.$date);

    // Test date selection by clicking from act
    // @ts-ignore-next-line: we will have onClick here
    act(() => result.current.propGetters.dayButton(d2).onClick());
    expect(state.current[0][0]).toBe(d2.$date);
  });

  test('useDatePicker return correct selectDates with multiple mode and toggle', () => {
    const { result: state } = renderHook(() => useState<Date[]>([]));
    const { result, rerender } = renderHook(() =>
      useDatePicker({
        selectedDates: state.current[0],
        onDatesChange: state.current[1],
        dates: {
          mode: 'multiple',
          toggle: true,
        },
      }),
    );

    const d1 = result.current.data.calendars[0].days[1];
    const d2 = result.current.data.calendars[0].days[2];

    // Test date selection by clicking from propGetter
    // @ts-ignore-next-line: we will have onClick here
    act(() => result.current.propGetters.dayButton(d1).onClick());
    expect(state.current[0]).toEqual([d1.$date]);

    rerender();

    // Test date selection by clicking from action
    // @ts-ignore-next-line: we will have onClick here
    act(() => result.current.propGetters.dayButton(d2).onClick());
    expect(state.current[0]).toEqual([d1.$date, d2.$date]);

    rerender();

    // Toggle first selected date
    // @ts-ignore-next-line: we will have onClick here
    act(() => result.current.propGetters.dayButton(d1).onClick());
    expect(state.current[0]).toEqual([d2.$date]);

    rerender();

    // Toggle second selected date
    // @ts-ignore-next-line: we will have onClick here
    act(() => result.current.propGetters.dayButton(d2).onClick());
    expect(state.current[0]).toEqual([]);
  });

  test.skip('useDatePicker: test edges with minDate and maxDate', () => {
    // For this test we will set min and max dates in the middle of the month
    // Since 9 and 11 are my favorite digit and number it will be 9-11 :)
    const NOW = newDate();
    const { Y, M } = getDateParts(NOW);
    const minDate = 9;
    const maxDate = 11;

    const { result } = renderHook(() =>
      useDatePicker({
        selectedDates: [],
        onDatesChange: vi.fn(),
        dates: {
          minDate: newDate(Y, M, minDate),
          maxDate: newDate(Y, M, maxDate),
        },
      }),
    );

    //Ensure that next month button is disabled
    expect(result.current.propGetters.addOffset({ months: 1 }).disabled).toBe(
      true,
    );
    expect(
      result.current.propGetters.subtractOffset({ months: 1 }).disabled,
    ).toBe(undefined);

    // Ensure that all months disabled expect current
    const enabledMonths = result.current.data.months.filter(
      ({ disabled }) => !disabled,
    );
    expect(enabledMonths.length).toBe(1);

    // Ensure that next/previous years buttons are disabled
    expect(result.current.propGetters.nextYearsButton().disabled).toBe(true);
    expect(result.current.propGetters.previousYearsButton().disabled).toBe(
      true,
    );

    // Ensure that all years disabled expect current
    const enabledYears = result.current.data.years.filter(
      ({ disabled }) => !disabled,
    );
    expect(enabledYears.length).toBe(1);

    // Ensure that we have only 3 enabled days
    // 9 10 and 11 of current month
    const enabledDays = result.current.data.calendars[0].days.filter(
      ({ disabled }) => !disabled,
    );
    expect(enabledDays.length).toBe(3);
    const [leftEdge] = result.current.data.calendars[0].days.filter(
      ({ $date }) => $date.getDate() === minDate - 1,
    );
    const [rightEdge] = result.current.data.calendars[0].days.filter(
      ({ $date }) => $date.getDate() === maxDate + 1,
    );

    // Ensure that buttons beyond range has no onCLick and disabled
    expect(result.current.propGetters.dayButton(leftEdge).onClick).toBeFalsy();
    expect(result.current.propGetters.dayButton(leftEdge).disabled).toBe(true);

    expect(result.current.propGetters.dayButton(rightEdge).onClick).toBeFalsy();
    expect(result.current.propGetters.dayButton(rightEdge).disabled).toBe(true);
  });
});
