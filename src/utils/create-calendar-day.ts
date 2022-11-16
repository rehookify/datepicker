import { NOW } from '../constants';
import { CreateCalendarDay } from '../types';
import { isSame } from './date';

export const createCalendarDay: CreateCalendarDay = (
  day,
  currentDate,
  selectedDates,
  { locale, options },
) => ({
  $day: day,
  date: day.toLocaleDateString(locale, {
    day: options?.day,
    month: options?.month,
    year: options?.year,
  }),
  day: Number(day.toLocaleDateString(locale, { day: options?.day })),
  month: Number(day.toLocaleDateString(locale, { month: options?.month })),
  year: day.getFullYear(),
  currentDisplayedMonth: day.getMonth() === currentDate.getMonth(),
  isToday: isSame(NOW, day),
  isSelected: selectedDates.filter((d) => isSame(d, day)).length > 0,
});
