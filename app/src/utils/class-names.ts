import {
  CalendarDay,
  CalendarMonth,
  CalendarYear,
  Time,
} from '@rehookify/datepicker';
import clsx from 'clsx';

export const getDayClassName = (
  { selected, inCurrentMonth, range, now }: CalendarDay,
  ...classNames: string[]
) =>
  clsx(
    'day-cell',
    'day',
    range,
    {
      now,
      selected,
      secondary: !inCurrentMonth,
    },
    ...classNames,
  );

export const getMonthClassName = ({ active, selected, now }: CalendarMonth) =>
  clsx('month', { active, selected, now });

export const getYearsClassName = ({ active, selected, now }: CalendarYear) =>
  clsx('year', { active, selected, now });

export const getTimeClassName = ({ selected }: Time) =>
  clsx('time-button', { selected });
