import { describe, test, expect } from '@jest/globals';
import { useDatePicker } from '../use-date-picker';
import { renderHook, act } from '@testing-library/react';
import { getCleanDate, getDateParts } from '../utils/date';

describe('useDatePicker', () => {
  test('useDatePicker returns correct selectedDates with default config', () => {
    const { result } = renderHook(() => useDatePicker());

    const d1 = result.current.data.calendars[0].days[1];
    const d2 = result.current.data.calendars[0].days[2];

    // Test date selection by clicking from propGetter
    // @ts-ignore-next-line: we will have onClick here
    act(() => result.current.propGetters.dayButton(d1).onClick());
    expect(result.current.data.selectedDates[0]).toBe(d1.date);

    // Test date selection by clicking from action
    act(() => result.current.actions.setDay(d2.$date));
    expect(result.current.data.selectedDates[0]).toBe(d2.date);
  });

  test('useDatePicker return correct selectDates with multiple mode and toggle', () => {
    const { result } = renderHook(() =>
      useDatePicker({
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
    expect(result.current.data.selectedDates).toEqual([d1.date]);

    // Test date selection by clicking from action
    act(() => result.current.actions.setDay(d2.$date));
    expect(result.current.data.selectedDates).toEqual([d1.date, d2.date]);

    // Toggle first selected date
    // @ts-ignore-next-line: we will have onClick here
    act(() => result.current.propGetters.dayButton(d1).onClick());
    expect(result.current.data.selectedDates).toEqual([d2.date]);

    // Toggle second selected date
    act(() => result.current.actions.setDay(d2.$date));
    expect(result.current.data.selectedDates).toEqual([]);
  });

  test('useDatePicker month manipulation', () => {
    const { result } = renderHook(() => useDatePicker());

    const [month1] = result.current.data.months.filter(({ active }) => active);

    // @ts-ignore-next-line: we will have onClick with default config
    act(() => result.current.propGetters.nextMonthButton().onClick());

    const [month2] = result.current.data.months.filter(({ active }) => active);

    expect(month2.$date.getMonth()).toBe(month1.$date.getMonth() + 1);

    // @ts-ignore-next-line: we will have onClick with default config
    act(() => result.current.propGetters.previousMonthButton().onClick());

    const [month3] = result.current.data.months.filter(({ active }) => active);
    expect(month1).toEqual(month3);

    const month4 = result.current.data.months[4];
    // @ts-ignore-next-line: we will have onClick with default config
    act(() => result.current.propGetters.monthButton(month4).onClick());

    const [activeMonth] = result.current.data.months.filter(
      ({ active }) => active,
    );

    expect(activeMonth.$date).toEqual(month4.$date);
  });

  test('useDatePicker years manipulations', () => {
    const { result } = renderHook(() => useDatePicker());

    const [currentStartYear] = result.current.data.years;

    // @ts-ignore-next-line: we will have onClick with default config
    act(() => result.current.propGetters.nextYearsButton().onClick());
    expect(result.current.data.years[0].value).toBe(
      currentStartYear.value + 10,
    );

    // @ts-ignore-next-line: we will have onClick with default config
    act(() => result.current.propGetters.previousYearsButton().onClick());
    expect(result.current.data.years[0].value).toBe(currentStartYear.value);

    act(() =>
      // @ts-ignore-next-line: we will have onClick with default config
      result.current.propGetters.yearButton(currentStartYear).onClick(),
    );
    expect(result.current.data.months[0].$date.getFullYear()).toBe(
      currentStartYear.value,
    );
    expect(result.current.data.years[0].value).toBe(
      currentStartYear.value - 10,
    );
  });

  test('useDatePicker edges with minDate and maxDate', () => {
    // For this test we will set min and max dates in the middle of the month
    // Since 9 and 11 are my favorite digit and number it will be 9-11 :)
    const NOW = new Date();
    const { Y, M } = getDateParts(NOW);
    const minDate = 9;
    const maxDate = 11;

    const { result } = renderHook(() =>
      useDatePicker({
        dates: {
          minDate: new Date(Y, M, minDate),
          maxDate: new Date(Y, M, maxDate),
        },
      }),
    );

    //Ensure that next/previous months buttons are disabled
    expect(result.current.propGetters.nextMonthButton().disabled).toBe(true);
    expect(result.current.propGetters.previousMonthButton().disabled).toBe(
      true,
    );

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
