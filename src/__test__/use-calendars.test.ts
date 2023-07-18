import { renderHook } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import { useCalendars } from '../use-calendars';
import { useDatePickerState } from '../use-date-picker-state';
import { createCalendars } from '../utils/create-calendars';
import { createWeekdays } from '../utils/create-weekdays';

describe('useCalendars', () => {
  test('useCalendars should return correct calendars and weekDays', () => {
    const { result: stateResult } = renderHook(() =>
      useDatePickerState({ selectedDates: [], onDatesChange: vi.fn() }),
    );
    const { result } = renderHook(() => useCalendars(stateResult.current));

    const calendars = createCalendars(stateResult.current);

    const weekDays = createWeekdays(calendars[0], stateResult.current.config);

    expect(result.current.calendars).toEqual(calendars);
    expect(result.current.weekDays).toEqual(weekDays);
  });
});
