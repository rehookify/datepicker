import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';

import { DAYS_ARRAY, DAYS_NAMES, MONTHS_NAMES, NOW } from './constants';
import {
  CalendarDay,
  CalendarMonth,
  CreateCalendarDay,
  PropsGetterConfig,
} from './types';
import { isFunction } from './utils/predicates';

const createCalendarDay: CreateCalendarDay = (
  day,
  currentDate,
  selectedDate,
) => ({
  $day: day,
  date: day.format('DD.MM.YYYY'),
  day: day.format('DD'),
  month: day.format('MM'),
  year: day.format('YYYY'),
  currentDisplayedMonth: day.format('MM') === currentDate.format('MM'),
  isToday: dayjs().isSame(day, 'day'),
  isSelected: day.isSame(selectedDate, 'day'),
});

export const useDatepicker = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(NOW);
  const [calendarDate, setCalendarDate] = useState<Dayjs>(selectedDate);

  const previousMonthLastDay = Number(calendarDate.date(0).format('d'));

  const calendar = DAYS_ARRAY.map((el, index) =>
    createCalendarDay(
      calendarDate.date(el + index - previousMonthLastDay),
      calendarDate,
      selectedDate,
    ),
  );

  const onNextMonthClick = () => setCalendarDate(calendarDate.add(1, 'month'));

  const onPreviousMonthClick = () =>
    setCalendarDate(calendarDate.subtract(1, 'month'));

  const onDayClick = (day: Dayjs) => {
    setSelectedDate(day);
    setCalendarDate(day);
  };

  const reset = (day?: Dayjs) => onDayClick(day || selectedDate);

  const getNextMonthButtonProps = () => ({
    onClick: onNextMonthClick,
  });

  const getPreviousMonthButtonProps = () => ({
    onClick: onPreviousMonthClick,
  });

  const getDayButtonProps = (
    day: CalendarDay,
    { onClick, ...rest }: PropsGetterConfig,
  ) => ({
    onClick() {
      onDayClick(day.$day);
      if (onClick && isFunction(onClick)) {
        onClick(day.$day);
      }
    },
    'aria-role': 'button',
    ...rest,
  });

  const getMonthButtonProps = (
    { index }: CalendarMonth,
    { onClick, ...rest }: PropsGetterConfig,
  ) => ({
    onClick() {
      const newDay = calendarDate.month(index);
      setCalendarDate(newDay);
      if (onClick && isFunction(onClick)) {
        onClick(newDay);
      }
    },
    'aria-role': 'button',
    ...rest,
  });

  return {
    today: createCalendarDay(NOW, calendarDate, selectedDate),
    weekDays: DAYS_NAMES,
    months: MONTHS_NAMES,
    month: calendarDate.format('MMMM'),
    year: calendarDate.format('YYYY'),
    calendar,
    getNextMonthButtonProps,
    getPreviousMonthButtonProps,
    getDayButtonProps,
    getMonthButtonProps,
    reset,
  };
};
