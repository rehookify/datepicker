import type { Dayjs } from 'dayjs';

export interface CalendarMonth {
  name: string;
  index: number;
}

export interface CalendarDay {
  $day: Dayjs;
  date: string;
  day: string;
  month: string;
  year: string;
  currentDisplayedMonth: boolean;
  isSelected: boolean;
}

export type CreateCalendarDay = (
  day: Dayjs,
  currentDate: Dayjs,
  selectedDate: Dayjs,
) => CalendarDay;

export interface PropsGetterConfig extends Record<string, unknown> {
  onClick?(day: Dayjs): void;
}
