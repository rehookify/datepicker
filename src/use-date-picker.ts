import { useCallback, useReducer, Reducer } from 'react';

import { NOW } from './constants';
import {
  Action,
  selectDates,
  setOffset,
  setRangeEnd,
  setYear,
  State,
  stateReducer,
} from './state-reducer';
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
import { createInitialState } from './utils/create-initial-state';
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
import {
  minDateAndBefore,
  maxDateAndAfter,
  minDateAndBeforeFirstDay,
} from './utils/predicates';

export const useDatePicker = (userConfig?: DatePickerUserConfig) => {
  const config = createConfig(userConfig);
  const { dates, calendar, locale, years } = config;
  const { minDate, maxDate, toggle: datesToggle, mode: datesMode } = dates;
  const { step: yearsStep } = years;

  const [state, dispatch] = useReducer<Reducer<State, Action>>(
    stateReducer,
    createInitialState(config),
  );

  const { rangeEnd, selectedDates, offsetYear, offsetDate } = state;

  const calendars = createCalendars(
    offsetDate,
    selectedDates,
    rangeEnd,
    NOW,
    locale,
    dates,
    calendar,
  );

  const weekDays = createWeekdays(calendars[0], locale);

  const calendarYears = createYears(
    offsetYear,
    offsetDate,
    selectedDates,
    years,
    dates,
  );

  const months = createMonths(offsetDate, selectedDates, locale, dates);

  const callSetOffset = useCallback((d: Date) => setOffset(dispatch, d), []);

  // Actions
  const onDayClick = useCallback((d: Date) => {
    selectDates(dispatch, d);
  }, []);

  const onNextMonthClick = useCallback(
    () => callSetOffset(addToDate(offsetDate, 1, 'month')),
    [offsetDate, callSetOffset],
  );

  const onPreviousMonthClick = useCallback(
    () => callSetOffset(subtractFromDate(offsetDate, 1, 'month')),
    [offsetDate, callSetOffset],
  );

  const onNextYearsClick = useCallback(
    () => setYear(dispatch, offsetYear + yearsStep),
    [offsetYear, yearsStep],
  );

  const onPreviousYearsClick = useCallback(
    () => setYear(dispatch, offsetYear - yearsStep),
    [offsetYear, yearsStep],
  );

  const callSetRangeEnd = useCallback(
    (d: Date | null) => setRangeEnd(dispatch, d),
    [],
  );

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
            setRangeEnd(dispatch, null);
          callAll(onClick, skipFirst(onDayClick))(evt, $date);
        },
        {
          ...rest,
          ...(datesMode === 'range' &&
            selectedDates.length === 1 && {
              onMouseEnter() {
                setRangeEnd(dispatch, $date);
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
        (evt) => callAll(onClick, skipFirst(callSetOffset))(evt, $date),
        rest,
      ),
    [callSetOffset],
  );

  const nextMonthButton = useCallback(
    ({ onClick, disabled, ...rest }: PropsGetterConfig = {}) => {
      const nextMonth = addToDate(offsetDate, 1, 'month');
      const isDisabled =
        !!disabled ||
        maxDateAndAfter(maxDate, getFirstDayOfTheMonth(nextMonth));

      return createPropGetter(
        isDisabled,
        (evt) => callAll(onClick, skipFirst(callSetOffset))(evt, nextMonth),
        rest,
      );
    },
    [offsetDate, maxDate, callSetOffset],
  );

  const previousMonthButton = useCallback(
    ({ onClick, disabled, ...rest }: PropsGetterConfig = {}) => {
      const nextMonth = subtractFromDate(offsetDate, 1, 'month');
      const isDisabled =
        !!disabled || minDateAndBeforeFirstDay(minDate, nextMonth);

      return createPropGetter(
        isDisabled,
        (evt) => callAll(onClick, skipFirst(callSetOffset))(evt, nextMonth),
        rest,
      );
    },
    [offsetDate, minDate, callSetOffset],
  );

  const yearButton = useCallback(
    (
      { $date, disabled }: CalendarYear,
      { onClick, disabled: disabledProps, ...rest }: PropsGetterConfig = {},
    ) =>
      createPropGetter(
        !!disabledProps || disabled,
        (evt) => callAll(onClick, skipFirst(callSetOffset))(evt, $date),
        rest,
      ),
    [callSetOffset],
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
      setMonth: callSetOffset,
      setNextMonth: onNextMonthClick,
      setPreviousMonth: onPreviousMonthClick,
      setYear: callSetOffset,
      setNextYears: onNextYearsClick,
      setPreviousYears: onPreviousYearsClick,
      setRangeEnd: callSetRangeEnd,
    },
  };
};
