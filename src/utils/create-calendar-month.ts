import { CreateCalendarMonth } from '../types';

export const createCalendarMonth: CreateCalendarMonth = (
  index,
  currentDate,
) => {
  const currentDay = currentDate.month(index);
  const name = currentDay.format('MMMM');
  return {
    $day: currentDay,
    name,
    isSelected: currentDate.format('MMMM') === name,
  };
};
