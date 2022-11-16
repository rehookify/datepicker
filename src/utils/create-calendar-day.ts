import { NOW } from '../constants';
import { CreateCalendarDay } from '../types';
import { isSame } from './date';

export const createCalendarDay: CreateCalendarDay = (
  day,
  currentDate,
  selectedDates,
  locale,
) => ({
  $day: day,
  date: day.toLocaleDateString(locale),
  day: Number(day.toLocaleDateString(locale, { day: '2-digit' })),
  month: Number(day.toLocaleDateString(locale, { month: '2-digit' })),
  year: day.getFullYear(),
  currentDisplayedMonth: day.getMonth() === currentDate.getMonth(),
  isToday: isSame(NOW, day),
  isSelected: selectedDates.filter((d) => isSame(d, day)).length > 0,
});
