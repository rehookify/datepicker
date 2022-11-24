import { useState, useCallback } from 'react';

import { NOW } from './constants';
import {
  CalendarDay,
  CalendarMonth,
  CalendarYear,
  PropsGetterConfig,
  DatePickerUserConfig,
} from './types';
import { callAll, skipFirst, skipAll } from './utils/call-all';
import { createCalendars } from './utils/create-calendars';
import { createConfig } from './utils/create-config';
import { createMonths } from './utils/create-months';
import { createPropGetter } from './utils/create-prop-getter';
import { createWeekdays } from './utils/create-weekdays';
import { createYears } from './utils/create-years';
import {
  addToDate,
  subtractFromDate,
  getFirstDayOfTheMonth,
  formatDate,
} from './utils/date';
import { getCalendarStartDate } from './utils/get-calendar-start-date';
import { getStartDecadePosition } from './utils/get-current-year-position';
import { getMultipleDates } from './utils/get-multiple-dates';
import {
  minDateAndBefore,
  maxDateAndAfter,
  minDateAndBeforeFirstDay,
} from './utils/predicates';

export const useDatePicker = (userConfig?: DatePickerUserConfig) => {
  const { dates, calendar, locale, years } = createConfig(userConfig);
  const { minDate, maxDate, toggle: datesToggle, mode: datesMode } = dates;

  const [rangeEnd, setRangeEnd] = useState<Date | null>(null);
  const [selectedDates, setSelectedDates] = useState<Date[]>(
    dates.selectedDates,
  );
  const [calendarDate, setCalendarDate] = useState<Date>(
    selectedDates.length > 0
      ? selectedDates[selectedDates.length - 1]
      : getCalendarStartDate(dates, NOW),
  );
  const [currentYear, setCurrentYear] = useState<number>(
    getStartDecadePosition(calendarDate.getFullYear()),
  );

  const calendars = createCalendars(
    calendarDate,
    selectedDates,
    rangeEnd,
    NOW,
    locale,
    dates,
    calendar,
  );

  const weekDays = createWeekdays(calendars[0], locale);

  const calendarYears = createYears(
    currentYear,
    calendarDate,
    selectedDates,
    years,
    dates,
  );

  const months = createMonths(calendarDate, selectedDates, locale, dates);

  const setMonthAndYear = useCallback((d: Date) => {
    setCalendarDate(d);
    setCurrentYear(getStartDecadePosition(d.getFullYear()));
  }, []);

  // Actions
  const onDayClick = useCallback(
    (d: Date) => {
      setSelectedDates(getMultipleDates(selectedDates, d, dates));
    },
    [dates, selectedDates],
  );

  const onNextMonthClick = useCallback(
    () => setMonthAndYear(addToDate(calendarDate, 1, 'month')),
    [calendarDate, setMonthAndYear],
  );

  const onPreviousMonthClick = useCallback(
    () => setMonthAndYear(subtractFromDate(calendarDate, 1, 'month')),
    [calendarDate, setMonthAndYear],
  );

  const onNextYearsClick = useCallback(() => setCurrentYear((s) => s + 10), []);

  const onPreviousYearsClick = useCallback(
    () => setCurrentYear((s) => s - 10),
    [],
  );

  const onSetCalendarDate = useCallback((d: Date) => setCalendarDate(d), []);

  // propsGetter
  const dayButton = useCallback(
    (
      { $date, isSelected, disabled }: CalendarDay,
      { onClick, disabled: disabledProps, ...rest }: PropsGetterConfig = {},
    ) =>
      createPropGetter(
        disabled || !!disabledProps,
        (evt) => {
          if (isSelected && !datesToggle) return;
          if (datesMode === 'range' && selectedDates.length === 1)
            setRangeEnd(null);
          callAll(onClick, skipFirst(onDayClick))(evt, $date);
        },
        {
          ...rest,
          ...(datesMode === 'range' &&
            selectedDates.length === 1 && {
              onMouseEnter() {
                setRangeEnd($date);
              },
            }),
        },
      ),
    [datesMode, datesToggle, onDayClick, selectedDates.length],
  );

  const monthButton = useCallback(
    (
      { $date, disabled }: CalendarMonth,
      { onClick, disabled: disabledProps, ...rest }: PropsGetterConfig = {},
    ) =>
      createPropGetter(
        !!disabledProps || disabled,
        (evt) => callAll(onClick, skipFirst(onSetCalendarDate))(evt, $date),
        rest,
      ),
    [onSetCalendarDate],
  );

  const nextMonthButton = useCallback(
    ({ onClick, disabled, ...rest }: PropsGetterConfig = {}) => {
      const nextMonth = addToDate(calendarDate, 1, 'month');
      const isDisabled =
        !!disabled ||
        maxDateAndAfter(maxDate, getFirstDayOfTheMonth(nextMonth));

      return createPropGetter(
        isDisabled,
        (evt) => callAll(onClick, skipFirst(setMonthAndYear))(evt, nextMonth),
        rest,
      );
    },
    [calendarDate, maxDate, setMonthAndYear],
  );

  const previousMonthButton = useCallback(
    ({ onClick, disabled, ...rest }: PropsGetterConfig = {}) => {
      const nextMonth = subtractFromDate(calendarDate, 1, 'month');
      const isDisabled =
        !!disabled || minDateAndBeforeFirstDay(minDate, nextMonth);

      return createPropGetter(
        isDisabled,
        (evt) => callAll(onClick, skipFirst(setMonthAndYear))(evt, nextMonth),
        rest,
      );
    },
    [calendarDate, minDate, setMonthAndYear],
  );

  const yearButton = useCallback(
    (
      { $date, disabled }: CalendarYear,
      { onClick, disabled: disabledProps, ...rest }: PropsGetterConfig = {},
    ) =>
      createPropGetter(
        !!disabledProps || disabled,
        (evt) => callAll(onClick, skipFirst(setMonthAndYear))(evt, $date),
        rest,
      ),
    [setMonthAndYear],
  );

  const nextYearsButton = useCallback(
    ({ onClick, disabled, ...rest }: PropsGetterConfig = {}) => {
      const isDisabled =
        !!disabled ||
        maxDateAndAfter(maxDate, calendarYears[calendarYears.length - 1].$date);

      return createPropGetter(
        isDisabled,
        (evt) => callAll(onClick, skipAll(onNextYearsClick))(evt),
        rest,
      );
    },
    [calendarYears, maxDate, onNextYearsClick],
  );

  const previousYearsButton = useCallback(
    ({ onClick, disabled, ...rest }: PropsGetterConfig = {}) => {
      const isDisabled =
        !!disabled || minDateAndBefore(minDate, calendarYears[0].$date);

      return createPropGetter(
        isDisabled,
        (evt) => callAll(onClick, skipAll(onPreviousYearsClick))(evt),
        rest,
      );
    },
    [calendarYears, minDate, onPreviousYearsClick],
  );

  return {
    data: {
      calendars,
      weekDays,
      months,
      years: calendarYears,
      selectedDates: selectedDates.map((d) => formatDate(d, locale)),
    },
    propGetters: {
      nextMonthButton,
      previousMonthButton,
      dayButton,
      monthButton,
      yearButton,
      nextYearsButton,
      previousYearsButton,
    },
    actions: {
      setDay: onDayClick,
      setMonth: setCalendarDate,
      setNextMonth: onNextMonthClick,
      setPreviousMonth: onPreviousMonthClick,
      setYear: setMonthAndYear,
      setNextYears: onNextYearsClick,
      setPreviousYears: onPreviousYearsClick,
      setRangeEnd,
    },
  };
};
