import { DAYS_IN_WEEK } from '../constants';
import { Calendar, LocaleConfig } from '../types';
import { toLocaleDateString } from './date';

export const createWeekdays = (
  { days }: Calendar,
  { locale, weekday }: LocaleConfig,
) => {
  const weekdays = [];

  for (let i = 0; i < DAYS_IN_WEEK; i++) {
    weekdays.push(toLocaleDateString(days[i].$date, locale, { weekday }));
  }

  return weekdays;
};
