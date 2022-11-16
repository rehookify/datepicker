import { useState, MouseEvent } from 'react';

import { DAYS_ARRAY, MONTHS_NAMES, NOW } from './constants';
import {
  CalendarDay,
  CalendarMonth,
  CalendarYear,
  PropsGetterConfig,
  DatePickerUserConfig,
} from './types';
import {
  createCalendarDay,
  createCalendarMonth,
  createCalendarYear,
  createButtonProps,
  getStartDecadePosition,
  isFunction,
  createConfig,
  getCalendarDate,
  ensureArray,
  addToDate,
  subtractFromDate,
  isBefore,
  isAfter,
  getFirstMonthDay,
  getMultipleDates,
} from './utils';

export const useDatepicker = (userConfig?: DatePickerUserConfig) => {
  const config = createConfig(userConfig);
  const { dates, calendar, locale, years } = config;

  const [selectedDates, setSelectedDates] = useState<Date[]>(() => {
    if (dates.selectedDates) {
      return dates.selectedDates;
    }

    return calendar.selectNow ? [NOW] : [];
  });
  const [calendarDate, setCalendarDate] = useState<Date>(
    selectedDates.length > 0
      ? selectedDates[selectedDates.length - 1]
      : getCalendarDate(config),
  );
  const [currentYear, setCurrentYear] = useState<number>(
    getStartDecadePosition(calendarDate.getFullYear()),
  );

  const NOW_YEAR = calendarDate.getFullYear();
  const NOW_MONTH = calendarDate.getMonth();
  const firstDayOffset = new Date(NOW_YEAR, NOW_MONTH, 1).getDay();

  const calendars = DAYS_ARRAY.map((el, index) =>
    createCalendarDay(
      new Date(NOW_YEAR, NOW_MONTH, el - firstDayOffset + index + 1),
      calendarDate,
      selectedDates,
      locale,
    ),
  );

  const weekDays = calendars.slice(0, 7).map(({ $day }) =>
    $day.toLocaleDateString(locale.locale, {
      weekday: locale.options?.weekday,
    }),
  );

  const calendarYears = Array(years.numberOfYearsDisplayed)
    .fill(1)
    .map((_, index) =>
      createCalendarYear(index, currentYear, calendarDate, selectedDates),
    );

  const months: CalendarMonth[] = MONTHS_NAMES.map((_, index) =>
    createCalendarMonth(
      new Date(calendarDate.getFullYear(), index, 1),
      calendarDate,
      selectedDates,
      locale,
    ),
  );

  const setMonthAndYear = (day: Date) => {
    setCalendarDate(day);
    setCurrentYear(getStartDecadePosition(day.getFullYear()));
  };

  // Actions
  const onDayClick = (day: Date) => {
    setSelectedDates(getMultipleDates(selectedDates, day, dates));
    setMonthAndYear(day);
  };

  const onMonthClick = setCalendarDate;

  const onNextMonthClick = () =>
    setMonthAndYear(addToDate(calendarDate, 1, 'month'));

  const onPreviousMonthClick = () =>
    setMonthAndYear(subtractFromDate(calendarDate, 1, 'month'));

  const onNextYearsClick = () => setCurrentYear((s) => s + 10);

  const onPreviousYearsClick = () => setCurrentYear((s) => s - 10);

  const onYearClick = setMonthAndYear;

  const reset = (day?: Date) => {
    const resetDay = ensureArray(day) as Date[];
    const nowDay = calendar.selectNow ? [NOW] : [];
    setSelectedDates(resetDay.length > 0 ? resetDay : nowDay);
    setMonthAndYear(resetDay[0]);
  };

  // propsGetter
  const dayButton = (
    { $day, isSelected }: CalendarDay,
    { onClick, disabled: disabledProps, ...rest }: PropsGetterConfig = {},
  ) => {
    const disabled =
      !!disabledProps ||
      (!!dates.minDate && isBefore($day, dates.minDate)) ||
      (!!dates.maxDate && isAfter($day, dates.maxDate));

    return {
      onClick(evt: MouseEvent<HTMLElement>) {
        if (disabled || (isSelected && !dates.toggle)) return;
        onDayClick($day);
        if (onClick && isFunction(onClick)) onClick($day, evt);
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
      (dates.minDate && isBefore($day, getFirstMonthDay(dates.minDate))) ||
      (dates.maxDate && isAfter(getFirstMonthDay($day), dates.maxDate));

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

  const nextMonthButton = ({
    onClick,
    disabled: disabledProps,
    ...rest
  }: PropsGetterConfig = {}) => {
    const nextMonth = addToDate(calendarDate, 1, 'month');
    const disabled =
      !!disabledProps ||
      (dates.maxDate && isAfter(getFirstMonthDay(nextMonth), dates.maxDate));

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
      !!disabledProps ||
      (dates.minDate && isBefore(nextMonth, getFirstMonthDay(dates.minDate)));

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
    { $day }: CalendarYear,
    { onClick, disabled: disabledProps, ...rest }: PropsGetterConfig = {},
  ) => {
    const disabled =
      !!disabledProps ||
      (dates.minDate && isBefore($day, getFirstMonthDay(dates.minDate))) ||
      (dates.maxDate && isAfter(getFirstMonthDay($day), dates.maxDate));

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
      years.disablePagination ||
      (dates.maxDate &&
        isAfter(calendarYears[calendarYears.length - 1].$day, dates.maxDate));

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
      (dates.minDate && isBefore(calendarYears[0].$day, dates.minDate));

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
      today: createCalendarDay(NOW, calendarDate, selectedDates, locale),
      calendars,
      weekDays,
      month: calendarDate.toLocaleDateString(locale.locale, {
        month: locale.monthName,
      }),
      months,
      year: calendarDate.getFullYear(),
      years: calendarYears,
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
