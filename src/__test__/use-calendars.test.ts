import { describe, expect, test } from '@jest/globals';
import { renderHook } from '@testing-library/react';

import { useCalendars } from '../use-calendars';
import { useDatePickerState } from '../use-date-picker-state';
import { createCalendars } from '../utils/create-calendars';
import { createWeekdays } from '../utils/create-weekdays';

describe('useCalendars', () => {
  test('useCalendars should return correct calendars and weekDays', () => {
    const { result: stateResult } = renderHook(() => useDatePickerState());
    const { result } = renderHook(() => useCalendars(stateResult.current));

    const { selectedDates, state } = stateResult.current;

    const calendars = createCalendars(selectedDates, state);

    const weekDays = createWeekdays(calendars[0], state.config);

    expect(result.current.calendars).toEqual(calendars);
    expect(result.current.weekDays).toEqual(weekDays);
  });
});
