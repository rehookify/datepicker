import { describe, test, expect } from '@jest/globals';
import { renderHook } from '@testing-library/react';

import { useCalendars } from '../use-calendars';
import { useDatePickerState } from '../use-date-picker-state';
import { createCalendars } from '../utils/create-calendars';
import { createWeekdays } from '../utils/create-weekdays';

describe('useCalendars', () => {
  test('useCalendars should return correct calendars and weekDays', () => {
    const { result: stateResult } = renderHook(() => useDatePickerState());
    const { result } = renderHook(() => useCalendars(stateResult.current[0]));

    const { offsetDate, selectedDates, rangeEnd, config } =
      stateResult.current[0];
    const { locale, dates, calendar } = config;

    const calendars = createCalendars(
      offsetDate,
      selectedDates,
      rangeEnd,
      offsetDate,
      locale,
      dates,
      calendar,
    );

    const weekDays = createWeekdays(calendars[0], locale);

    expect(result.current.calendars).toEqual(calendars);
    expect(result.current.weekDays).toEqual(weekDays);
  });
});
