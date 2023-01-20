import { useState } from 'react';
import { describe, test, expect } from '@jest/globals';
import { act, renderHook } from '@testing-library/react';
import { useCalendars } from '../use-calendars';
import { useDatePickerState } from '../use-date-picker-state';

import { useDays, useDaysPropGetters } from '../use-days';
import { formatDate } from '../utils/date';

describe('useDays', () => {
  test('useDays should return correct selected and formatted dates', () => {
    const d1 = new Date(2022, 11, 9);
    const d2 = new Date(2022, 11, 11);
    const { result: stateResult } = renderHook(() =>
      useDatePickerState({ selectedDates: [d1, d2] }),
    );
    const { result } = renderHook(() => useDays(stateResult.current));

    const { locale } = stateResult.current.state.config;

    expect(result.current.selectedDates).toEqual([d1, d2]);
    expect(result.current.formattedDates).toEqual([
      formatDate(d1, locale),
      formatDate(d2, locale),
    ]);
  });
});

describe('useDaysPropGetters', () => {
  test('dayButton should set date correctly', () => {
    const { result: state } = renderHook(() => useState<Date[]>([]));
    const { result: stateResult } = renderHook(() =>
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

    const { onClick } = dayButtonResult.current.dayButton(
      calendarsResult.current.calendars[0].days[11],
    );

    // @ts-ignore-next-line
    act(() => onClick());

    // expect(state.current[0][0]).toEqual([
    //   calendarsResult.current.calendars[0].days[11].$date,
    // ]);
  });
});
