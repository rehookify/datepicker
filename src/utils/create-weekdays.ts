import { DAYS_IN_WEEK } from '../constants';
import { Calendar, LocaleConfig } from '../types';
import { formatWeekdays } from './date';

export const createWeekdays = (calendar: Calendar, locale: LocaleConfig) => {
  const weekdays = [];

  for (let i = 0; i < DAYS_IN_WEEK; i++) {
    weekdays.push(formatWeekdays(calendar.days[i].$date, locale));
  }

  return weekdays;
};
