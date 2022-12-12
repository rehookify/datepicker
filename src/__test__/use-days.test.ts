import { describe, test, expect } from '@jest/globals';
import { act, renderHook } from '@testing-library/react';
import { useCalendars } from '../use-calendars';
import { useDatePickerState } from '../use-date-picker-state';

import { useDays, useDaysPropGetters, useDaysActions } from '../use-days';
import { formatDate } from '../utils/date';

describe('useDays', () => {
  test('useDays should return correct selected and formatted dates', () => {
    const d1 = new Date(2022, 11, 9);
    const d2 = new Date(2022, 11, 11);
    const { result: stateResult } = renderHook(() =>
      useDatePickerState({ dates: { selectedDates: [d1, d2] } }),
    );
    const { result } = renderHook(() => useDays(stateResult.current[0]));

    const { locale } = stateResult.current[0].config;

    expect(result.current.selectedDates).toEqual([d1, d2]);
    expect(result.current.formattedDates).toEqual([
      formatDate(d1, locale),
      formatDate(d2, locale),
    ]);
  });
});

describe('useDaysPropGetters', () => {
  test('dayButton should set date correctly', () => {
    const { result: stateResult } = renderHook(() => useDatePickerState());
    const { result: calendarsResult } = renderHook(() =>
      useCalendars(stateResult.current[0]),
    );
    const [state, dispatch] = stateResult.current;
    const { result: dayButtonResult } = renderHook(() =>
      useDaysPropGetters(state, dispatch),
    );

    const { onClick } = dayButtonResult.current.dayButton(
      calendarsResult.current.calendars[0].days[11],
    );

    // @ts-ignore-next-line
    act(() => onClick());

    expect(stateResult.current[0].selectedDates).toEqual([
      calendarsResult.current.calendars[0].days[11].$date,
    ]);
  });
});

describe('useDaysActions', () => {
  test('setDay should set date correctly', () => {
    const { result: stateResult } = renderHook(() => useDatePickerState());
    const { result: daysActions } = renderHook(() =>
      useDaysActions(stateResult.current[1]),
    );

    const d1 = new Date();

    const { setDay, setRangeEnd } = daysActions.current;

    act(() => setDay(d1));

    expect(stateResult.current[0].selectedDates).toEqual([d1]);

    act(() => setRangeEnd(d1));
    expect(stateResult.current[0].rangeEnd).toEqual(d1);
  });
});
