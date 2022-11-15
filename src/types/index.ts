import type { Dayjs } from 'dayjs';
import type { MouseEvent } from 'react';

export interface CalendarDay {
  $day: Dayjs;
  date: string;
  day: string;
  month: string;
  year: string;
  currentDisplayedMonth: boolean;
  isSelected: boolean;
  isToday: boolean;
}

export interface CalendarMonth {
  name: string;
  $day: Dayjs;
  isSelected: boolean;
}

export interface CalendarYear {
  value: number;
  $day: Dayjs;
  isSelected: boolean;
}

export type CreateCalendarDay = (
  day: Dayjs,
  currentDate: Dayjs,
  selectedDate: Dayjs | null,
) => CalendarDay;

export type CreateCalendarMonth = (
  index: number,
  currentDate: Dayjs,
) => CalendarMonth;

export type CreateCalendarYear = (
  offset: number,
  currentYear: number,
  currentDate: Dayjs,
) => CalendarYear;

export interface PropsGetterConfig extends Record<string, unknown> {
  onClick?(day?: Dayjs, evt?: MouseEvent<HTMLElement>): void;
  onClick?(evt?: MouseEvent<HTMLElement>): void;
  disabled?: boolean;
}

export type CalendarMode = 'static' | 'fluid';
export interface CalendarConfig {
  mode?: CalendarMode;
  selectNow?: boolean;
}

export type YearsPagination = 'decade' | 'centered';
export interface YearsConfig {
  numberOfYearsDisplayed?: number;
  pagination?: YearsPagination;
  disablePagination?: boolean;
}

export interface DatePickerUserConfig {
  calendar?: CalendarConfig;
  years?: YearsConfig;
  minDate?: Date | undefined;
  maxDate?: Date | undefined;
  selectedDate?: Date | undefined;
}

export interface DatePickerConfig {
  calendar: CalendarConfig;
  years: YearsConfig;
  minDate: Dayjs | null;
  maxDate: Dayjs | null;
  selectedDate: Dayjs | null;
}
