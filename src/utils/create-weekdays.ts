import { WEEK_DAYS } from '../constants';
import type { DPCalendar, DPConfig } from '../types';
import { toLocaleDateString } from './date';

export const createWeekdays = (
  { days }: DPCalendar,
  { locale: { locale, weekday } }: DPConfig,
): string[] =>
  WEEK_DAYS.map((day: number) =>
    toLocaleDateString(days[day].$date, locale, { weekday }),
  );
