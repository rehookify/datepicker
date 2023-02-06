import { WEEK_DAYS } from '../constants';
import { Calendar, DatePickerConfig } from '../types';
import { toLocaleDateString } from './date';

export const createWeekdays = (
  { days }: Calendar,
  { locale: { locale, weekday } }: DatePickerConfig,
) =>
  WEEK_DAYS.map((day: number) =>
    toLocaleDateString(days[day].$date, locale, { weekday }),
  );
