import { DAYS_IN_WEEK } from '../constants';
import { Calendar, LocaleConfig } from '../types';

export const createWeekdays = (
  { days }: Calendar,
  { locale, weekday }: LocaleConfig,
) => {
  const weekdays = [];

  for (let i = 0; i < DAYS_IN_WEEK; i++) {
    weekdays.push(days[i].$date.toLocaleDateString(locale, { weekday }));
  }

  return weekdays;
};
