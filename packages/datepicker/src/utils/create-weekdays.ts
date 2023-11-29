import type { DPCalendar, DPConfig } from '../types';
import { toLocaleDateString } from './date';

export function createWeekdays(
  { days }: DPCalendar,
  { locale: { locale, weekday } }: DPConfig,
): string[] {
  return [0, 1, 2, 3, 4, 5, 6].map((day: number) =>
    toLocaleDateString(days[day].$date, locale, { weekday }),
  );
}
