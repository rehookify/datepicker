import { CalendarDay } from '@rehookify/datepicker';
import clsx from 'clsx';

export const getDayClassName = (
  { isToday, selected, inCurrentMonth, range }: CalendarDay,
  ...classNames: string[]
) =>
  clsx(
    'day',
    range,
    {
      selected: selected,
      today: isToday,
      secondary: !inCurrentMonth,
    },
    ...classNames,
  );

export const getMonthClassName = (active: boolean, selected: boolean) =>
  clsx('month', { active, selected });

export const getYearsClassName = (active: boolean, selected: boolean) =>
  clsx('year', { active, selected });
