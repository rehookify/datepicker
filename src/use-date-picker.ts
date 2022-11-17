import { useState, MouseEvent } from 'react';

import { NOW } from './constants';
import {
  CalendarDay,
  CalendarMonth,
  CalendarYear,
  PropsGetterConfig,
  DatePickerUserConfig,
} from './types';
import {
  createCalendars,
  createYears,
  createButtonProps,
  getStartDecadePosition,
  createConfig,
  getCalendarStartDate,
  ensureArray,
  addToDate,
  subtractFromDate,
  getFirstMonthDay,
  getMultipleDates,
  formatDate,
  createMonths,
  maxDateAndAfter,
  minDateAndBeforeFirstDay,
  minDateAndBefore,
  createWeekdays,
} from './utils';
import { callAll, skipAll, skipFirst } from './utils/call-all';

export const useDatePicker = (userConfig?: DatePickerUserConfig) => {
  const { dates, calendar, locale, years } = createConfig(userConfig);
  const { minDate, maxDate, toggle: datesToggle, mode: datesMode } = dates;
  const { selectNow } = calendar;
  const { disablePagination } = years;

  const [rangeEnd, setRangeEnd] = useState<Date | null>(null);
  const [selectedDates, setSelectedDates] = useState<Date[]>(() => {
    if (dates.selectedDates.length > 0) {
      return dates.selectedDates;
    }

    return selectNow ? [NOW] : [];
  });
  const [calendarDate, setCalendarDate] = useState<Date>(
    selectedDates.length > 0
      ? selectedDates[selectedDates.length - 1]
      : getCalendarStartDate(dates),
  );
  const [currentYear, setCurrentYear] = useState<number>(
    getStartDecadePosition(calendarDate.getFullYear()),
  );

  const calendars = createCalendars(
    calendarDate,
    selectedDates,
    rangeEnd,
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
  );

  const months = createMonths(calendarDate, selectedDates, locale);

  const setMonthAndYear = (d: Date) => {
    setCalendarDate(d);
    setCurrentYear(getStartDecadePosition(d.getFullYear()));
  };

  // Actions
  const onDayClick = (d: Date) => {
    setSelectedDates(getMultipleDates(selectedDates, d, dates));
    setMonthAndYear(d);
  };

  const onNextMonthClick = () =>
    setMonthAndYear(addToDate(calendarDate, 1, 'month'));

  const onPreviousMonthClick = () =>
    setMonthAndYear(subtractFromDate(calendarDate, 1, 'month'));

  const onNextYearsClick = () => setCurrentYear((s) => s + 10);

  const onPreviousYearsClick = () => setCurrentYear((s) => s - 10);

  const onSetCalendarDate = (d: Date) => setCalendarDate(d);

  const reset = (date?: Date) => {
    const resetDates = ensureArray(date) as Date[];
    const newDates =
      resetDates.length > 0 ? resetDates : selectNow ? [NOW] : [];
    setSelectedDates(newDates);
    setMonthAndYear(newDates[0]);
  };

  // propsGetter
  const dayButton = (
    { $date, isSelected }: CalendarDay,
    { onClick, disabled, ...rest }: PropsGetterConfig = {},
  ) => {
    const isDisabled =
      !!disabled ||
      minDateAndBefore(minDate, $date) ||
      maxDateAndAfter(maxDate, $date);

    return {
      onClick(evt: MouseEvent<HTMLElement>) {
        if (isDisabled || (isSelected && !datesToggle)) return;
        if (datesMode === 'range' && selectedDates.length === 1)
          setRangeEnd(null);
        callAll(onClick, skipFirst(onDayClick))(evt, $date);
      },
      ...createButtonProps(isDisabled),
      ...rest,
      ...(datesMode === 'range' &&
        selectedDates.length === 1 && {
          onMouseEnter() {
            setRangeEnd($date);
          },
        }),
    };
  };

  const monthButton = (
    { $date }: CalendarMonth,
    { onClick, disabled, ...rest }: PropsGetterConfig = {},
  ) => {
    const isDisabled =
      !!disabled ||
      minDateAndBeforeFirstDay(minDate, $date) ||
      maxDateAndAfter(maxDate, getFirstMonthDay($date));

    return {
      onClick(evt: MouseEvent<HTMLElement>) {
        if (isDisabled) return;
        callAll(onClick, skipFirst(onSetCalendarDate))(evt, $date);
      },
      ...createButtonProps(isDisabled),
      ...rest,
    };
  };

  const nextMonthButton = ({
    onClick,
    disabled,
    ...rest
  }: PropsGetterConfig = {}) => {
    const nextMonth = addToDate(calendarDate, 1, 'month');
    const isDisabled =
      !!disabled || maxDateAndAfter(maxDate, getFirstMonthDay(nextMonth));

    return {
      onClick(evt: MouseEvent<HTMLElement>) {
        if (isDisabled) return;
        callAll(onClick, skipFirst(setMonthAndYear))(evt, nextMonth);
      },
      ...createButtonProps(isDisabled),
      ...rest,
    };
  };

  const previousMonthButton = ({
    onClick,
    disabled: disabledProps,
    ...rest
  }: PropsGetterConfig = {}) => {
    const nextMonth = subtractFromDate(calendarDate, 1, 'month');
    const disabled =
      !!disabledProps || minDateAndBeforeFirstDay(minDate, nextMonth);

    return {
      onClick(evt: MouseEvent<HTMLElement>) {
        if (disabled) return;
        callAll(onClick, skipFirst(setMonthAndYear))(evt, nextMonth);
      },
      ...createButtonProps(disabled as boolean),
      ...rest,
    };
  };

  const yearButton = (
    { $date }: CalendarYear,
    { onClick, disabled, ...rest }: PropsGetterConfig = {},
  ) => {
    const isDisabled =
      !!disabled ||
      minDateAndBeforeFirstDay(minDate, $date) ||
      maxDateAndAfter(maxDate, getFirstMonthDay($date));

    return {
      onClick(evt: MouseEvent<HTMLElement>) {
        if (isDisabled) return;
        callAll(onClick, skipFirst(setMonthAndYear))(evt, $date);
      },
      ...createButtonProps(isDisabled),
      ...rest,
    };
  };

  const nextYearsButton = ({
    onClick,
    disabled,
    ...rest
  }: PropsGetterConfig = {}) => {
    const isDisabled =
      !!disabled ||
      disablePagination ||
      maxDateAndAfter(maxDate, calendarYears[calendarYears.length - 1].$date);

    return {
      onClick(evt: MouseEvent<HTMLElement>) {
        if (isDisabled) return;
        callAll(onClick, skipAll(onNextMonthClick))(evt, undefined);
      },
      ...createButtonProps(isDisabled),
      ...rest,
    };
  };

  const previousYearsButton = ({
    onClick,
    disabled,
    ...rest
  }: PropsGetterConfig = {}) => {
    const isDisabled =
      !!disabled ||
      disablePagination ||
      minDateAndBefore(minDate, calendarYears[0].$date);

    return {
      onClick(evt: MouseEvent<HTMLElement>) {
        if (isDisabled) return;
        callAll(onClick, skipAll(onPreviousYearsClick))(evt, undefined);
      },
      ...createButtonProps(isDisabled),
      ...rest,
    };
  };

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
      reset,
      setNextYears: onNextYearsClick,
      setPreviousYears: onPreviousYearsClick,
      setNextMonth: onNextMonthClick,
      setPreviousMonth: onPreviousMonthClick,
      setDay: onDayClick,
      setMonth: setCalendarDate,
      setYear: setMonthAndYear,
      setRangeEnd,
    },
  };
};
