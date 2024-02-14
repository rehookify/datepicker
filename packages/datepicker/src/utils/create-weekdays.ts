import type { DPCalendar, DPConfig } from '../types';
import { toLocaleDateString } from './date';

export var createWeekdays = (
  { days }: DPCalendar,
  { locale: { locale, weekday } }: DPConfig,
): string[] =>
  [0, 1, 2, 3, 4, 5, 6].map((day: number) =>
    toLocaleDateString(days[day].$date, locale, { weekday }),
  );
