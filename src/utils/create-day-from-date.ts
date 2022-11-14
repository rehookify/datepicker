import { MinMaxDate } from '../types';
import { NOW } from '../constants';

export const createDayFromDate = (date?: MinMaxDate) => {
  if (!date) return null;
  const { day, month, year } = date;
  if (!day || !month || !year) {
    throw new Error('The date should have day, month and year');
  }

  // We sohuld set year because we could have 28 or 29 days in February
  const currentMonth = NOW.month(month - 1).year(year);
  if (day > currentMonth.daysInMonth()) {
    throw new Error(
      `${currentMonth.format(
        'MMMM',
      )} has maximum of ${currentMonth.daysInMonth()} days`,
    );
  }

  return currentMonth.date(day);
};
