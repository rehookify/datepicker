import { Dayjs } from 'dayjs';
import { useState, MouseEvent } from 'react';

import { DAYS_ARRAY, DAYS_NAMES, MONTHS_NAMES, NOW } from './constants';
import {
  CalendarDay,
  CalendarMonth,
  CalendarYear,
  PropsGetterConfig,
  DatePickerConfig,
} from './types';
import {
  createCalendarDay,
  createCalendarMonth,
  createCalendarYear,
  createButtonProps,
  getStartDecadePosition,
  isFunction,
  createConfig,
} from './utils';

export const useDatepicker = (userConfig?: DatePickerConfig) => {
  const config = createConfig(userConfig);

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(
    config.calendar.selectNow ? NOW : null,
  );
  const [calendarDate, setCalendarDate] = useState<Dayjs>(selectedDate || NOW);
  const [currentYear, setCurrentYear] = useState<number>(() =>
    getStartDecadePosition(Number(calendarDate.format('YYYY'))),
  );

  const previousMonthLastDay = Number(calendarDate.date(0).format('d'));

  const calendar = DAYS_ARRAY.map((el, index) =>
    createCalendarDay(
      calendarDate.date(el + index - previousMonthLastDay),
      calendarDate,
      selectedDate,
    ),
  );

  const years = Array(config.years.numberOfYearsDisplayed)
    .fill(1)
    .map((_, index) => createCalendarYear(index, currentYear, calendarDate));

  const months: CalendarMonth[] = MONTHS_NAMES.map((_, index) =>
    createCalendarMonth(index, calendarDate),
  );

  const setMonthAndYear = (day: Dayjs) => {
    setCalendarDate(day);
    setCurrentYear(getStartDecadePosition(Number(day.format('YYYY'))));
  };

  // Actions
  const onDayClick = (day: Dayjs) => {
    setSelectedDate(day);
    setMonthAndYear(day);
  };

  const onMonthClick = (day: Dayjs) => setCalendarDate(day);

  const onNextMonthClick = () => setMonthAndYear(calendarDate.add(1, 'month'));

  const onPreviousMonthClick = () =>
    setMonthAndYear(calendarDate.subtract(1, 'month'));

  const onNextYearsClick = () => setCurrentYear((s) => s + 10);

  const onPreviousYearsClick = () => setCurrentYear((s) => s - 10);

  const onYearClick = setMonthAndYear;

  const reset = (day?: Dayjs) => {
    const resetDay = day || NOW;
    setSelectedDate(day || null);
    setMonthAndYear(resetDay);
  };

  // propsGetter
  const dayButton = (
    { $day }: CalendarDay,
    { onClick, disabled: disabledProps, ...rest }: PropsGetterConfig = {},
  ) => {
    const disabled =
      !!disabledProps ||
      (!!config.minDate && $day.isBefore(config.minDate)) ||
      (!!config.maxDate && $day.isAfter(config.maxDate));

    return {
      onClick(evt: MouseEvent<HTMLElement>) {
        if (disabled) return;
        onDayClick($day);
        if (onClick && isFunction(onClick)) onClick($day, evt);
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
    const nextMonth = calendarDate.add(1, 'month');
    const disabled =
      !!disabledProps || (config.maxDate && nextMonth.isAfter(config.maxDate));

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
    const nextMonth = calendarDate.subtract(1, 'month');
    const disabled =
      !!disabledProps || (config.minDate && nextMonth.isBefore(config.minDate));

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

  const monthButton = (
    { $day }: CalendarMonth,
    { onClick, disabled: disabledProps, ...rest }: PropsGetterConfig = {},
  ) => {
    const disabled =
      !!disabledProps ||
      (config.minDate && $day.isBefore(config.minDate)) ||
      (config.maxDate && $day.isAfter(config.maxDate));

    return {
      onClick(evt: MouseEvent<HTMLElement>) {
        if (disabled) return;
        onMonthClick($day);
        if (onClick && isFunction(onClick)) onClick($day, evt);
      },
      ...createButtonProps(disabled as boolean),
      ...rest,
    };
  };

  const yearButton = (
    { $day }: CalendarYear,
    { onClick, disabled: disabledProps, ...rest }: PropsGetterConfig = {},
  ) => {
    const disabled =
      !!disabledProps ||
      (config.minDate && $day.isBefore(config.minDate)) ||
      (config.maxDate && $day.isAfter(config.maxDate));

    return {
      onClick(evt: MouseEvent<HTMLElement>) {
        if (disabled) return;
        setMonthAndYear($day);
        if (onClick && isFunction(onClick)) onClick($day, evt);
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
      config.years.disablePagination ||
      (config.maxDate && years[years.length - 1].$day.isAfter(config.maxDate));

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
      config.years.disablePagination ||
      (config.minDate && years[0].$day.isBefore(config.minDate));

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
      today: createCalendarDay(NOW, calendarDate, selectedDate),
      weekDays: DAYS_NAMES,
      month: calendarDate.format('MMMM'),
      months,
      year: calendarDate.format('YYYY'),
      years,
      calendar,
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
      setMonth: onMonthClick,
      setYear: onYearClick,
    },
  };
};
