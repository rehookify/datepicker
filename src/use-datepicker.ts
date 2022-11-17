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
  createCalendar,
  createYears,
  createButtonProps,
  getStartDecadePosition,
  isFunction,
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

export const useDatepicker = (userConfig?: DatePickerUserConfig) => {
  const { dates, calendar, locale, years } = createConfig(userConfig);

  const [rangeEnd, setRangeEnd] = useState<Date | null>(null);
  const [selectedDates, setSelectedDates] = useState<Date[]>(() => {
    if (dates.selectedDates.length > 0) {
      return dates.selectedDates;
    }

    return calendar.selectNow ? [NOW] : [];
  });
  const [calendarDate, setCalendarDate] = useState<Date>(
    selectedDates.length > 0
      ? selectedDates[selectedDates.length - 1]
      : getCalendarStartDate(dates),
  );
  const [currentYear, setCurrentYear] = useState<number>(
    getStartDecadePosition(calendarDate.getFullYear()),
  );

  const calendars = [
    createCalendar(
      calendarDate,
      selectedDates,
      rangeEnd,
      locale,
      dates,
      calendar.mode,
    ),
  ];

  const weekDays = createWeekdays(calendars[0], locale);

  const calendarYears = createYears(
    currentYear,
    calendarDate,
    selectedDates,
    years,
  );

  const months = createMonths(calendarDate, selectedDates, locale);

  const setMonthAndYear = (day: Date) => {
    setCalendarDate(day);
    setCurrentYear(getStartDecadePosition(day.getFullYear()));
  };

  // Actions
  const onDayClick = (day: Date) => {
    setSelectedDates(getMultipleDates(selectedDates, day, dates));
    setMonthAndYear(day);
  };

  const onNextMonthClick = () =>
    setMonthAndYear(addToDate(calendarDate, 1, 'month'));

  const onPreviousMonthClick = () =>
    setMonthAndYear(subtractFromDate(calendarDate, 1, 'month'));

  const onNextYearsClick = () => setCurrentYear((s) => s + 10);

  const onPreviousYearsClick = () => setCurrentYear((s) => s - 10);

  const reset = (day?: Date) => {
    const resetDay = ensureArray(day) as Date[];
    const nowDay = calendar.selectNow ? [NOW] : [];
    setSelectedDates(resetDay.length > 0 ? resetDay : nowDay);
    setMonthAndYear(resetDay[0]);
  };

  // propsGetter
  const dayButton = (
    { $date, isSelected }: CalendarDay,
    { onClick, disabled: disabledProps, ...rest }: PropsGetterConfig = {},
  ) => {
    const disabled =
      !!disabledProps ||
      minDateAndBefore(dates.minDate, $date) ||
      maxDateAndAfter(dates.maxDate, $date);

    return {
      onClick(evt: MouseEvent<HTMLElement>) {
        if (disabled || (isSelected && !dates.toggle)) return;
        if (dates.mode === 'range' && selectedDates.length === 1)
          setRangeEnd(null);
        onDayClick($date);
        if (onClick && isFunction(onClick)) onClick($date, evt);
      },
      ...(dates.mode === 'range' &&
        selectedDates.length === 1 && {
          onMouseEnter() {
            setRangeEnd($date);
          },
        }),
      ...createButtonProps(disabled as boolean),
      ...rest,
    };
  };

  const monthButton = (
    { $date }: CalendarMonth,
    { onClick, disabled: disabledProps, ...rest }: PropsGetterConfig = {},
  ) => {
    const disabled =
      !!disabledProps ||
      minDateAndBeforeFirstDay(dates.minDate, $date) ||
      maxDateAndAfter(dates.maxDate, getFirstMonthDay($date));

    return {
      onClick(evt: MouseEvent<HTMLElement>) {
        if (disabled) return;
        setCalendarDate($date);
        if (onClick && isFunction(onClick)) onClick($date, evt);
      },
      ...createButtonProps(disabled as boolean),
      ...rest,
    };
  };

  const nextMonthButton = ({
    onClick,
    disabled: disabledProps,
    ...rest
  }: PropsGetterConfig = {}) => {
    const nextMonth = addToDate(calendarDate, 1, 'month');
    const disabled =
      !!disabledProps ||
      maxDateAndAfter(dates.maxDate, getFirstMonthDay(nextMonth));

    return {
      onClick(evt: MouseEvent<HTMLElement>) {
        if (disabled) return;
        setMonthAndYear(nextMonth);
        if (onClick && isFunction(onClick)) onClick(nextMonth, evt);
      },
      ...createButtonProps(disabled as boolean),
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
      !!disabledProps || minDateAndBeforeFirstDay(dates.minDate, nextMonth);

    return {
      onClick(evt: MouseEvent<HTMLElement>) {
        if (disabled) return;
        setMonthAndYear(nextMonth);
        if (onClick && isFunction(onClick)) onClick(nextMonth, evt);
      },
      ...createButtonProps(disabled as boolean),
      ...rest,
    };
  };

  const yearButton = (
    { $date }: CalendarYear,
    { onClick, disabled: disabledProps, ...rest }: PropsGetterConfig = {},
  ) => {
    const disabled =
      !!disabledProps ||
      minDateAndBeforeFirstDay(dates.minDate, $date) ||
      maxDateAndAfter(dates.maxDate, getFirstMonthDay($date));

    return {
      onClick(evt: MouseEvent<HTMLElement>) {
        if (disabled) return;
        setMonthAndYear($date);
        if (onClick && isFunction(onClick)) onClick($date, evt);
      },
      ...createButtonProps(disabled as boolean),
      ...rest,
    };
  };

  const nextYearsButton = ({
    onClick,
    disabled: disabledProps,
    ...rest
  }: PropsGetterConfig = {}) => {
    const disabled =
      !!disabledProps ||
      years.disablePagination ||
      maxDateAndAfter(
        dates.maxDate,
        calendarYears[calendarYears.length - 1].$date,
      );

    return {
      onClick(evt: MouseEvent<HTMLElement>) {
        if (disabled) return;
        onNextYearsClick();
        if (onClick && isFunction(onClick)) onClick(evt);
      },
      ...createButtonProps(disabled as boolean),
      ...rest,
    };
  };

  const previousYearsButton = ({
    onClick,
    disabled: disabledProps,
    ...rest
  }: PropsGetterConfig = {}) => {
    const disabled =
      !!disabledProps ||
      years.disablePagination ||
      minDateAndBefore(dates.minDate, calendarYears[0].$date);

    return {
      onClick(evt: MouseEvent<HTMLElement>) {
        if (disabled) return;
        onPreviousYearsClick();
        if (onClick && isFunction(onClick)) onClick(evt);
      },
      ...createButtonProps(disabled as boolean),
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
