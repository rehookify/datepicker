import dayjs from 'dayjs';
import { CreateCalendarDay } from '../types';

export const createCalendarDay: CreateCalendarDay = (
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
