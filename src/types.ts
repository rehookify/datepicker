import type { MouseEvent } from 'react';

export interface CalendarDay {
  $day: Date;
  date: string;
  day: number;
  month: number;
  year: number;
  currentDisplayedMonth: boolean;
  isSelected: boolean;
  isToday: boolean;
}

export interface CalendarMonth {
  $day: Date;
  name: string;
  isSelected: boolean;
  isActive: boolean;
}

export interface CalendarYear {
  $day: Date;
  value: number;
  isSelected: boolean;
  isActive: boolean;
}

export type CreateCalendarDay = (
  day: Date,
  currentDate: Date,
  selectedDates: Date[],
  locale: Intl.LocalesArgument,
) => CalendarDay;

export type CreateCalendarMonth = (
  day: Date,
  currentDate: Date,
  selectedDates: Date[],
  locale: Intl.LocalesArgument,
) => CalendarMonth;

export type CreateCalendarYear = (
  offset: number,
  currentYear: number,
  currentDate: Date,
  selectedDates: Date[],
) => CalendarYear;

export interface PropsGetterConfig extends Record<string, unknown> {
  onClick?(day?: Date, evt?: MouseEvent<HTMLElement>): void;
  onClick?(evt?: MouseEvent<HTMLElement>): void;
  disabled?: boolean;
}

export type DatesMode = 'single' | 'multiple' | 'range';
export interface DatesUserConfig {
  mode?: DatesMode;
  minDate?: Date | undefined;
  maxDate?: Date | undefined;
  selectedDate?: Date | Date[] | undefined;
}

export type CalendarMode = 'static' | 'fluid';
export interface CalendarConfig {
  mode?: CalendarMode;
  selectNow?: boolean;
  locale?: Intl.LocalesArgument;
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
  dates?: DatesUserConfig;
}

export interface DatesConfig {
  mode: DatesMode;
  minDate: Date | null;
  maxDate: Date | null;
  selectedDates: Date[] | null;
}

export interface DatePickerConfig {
  calendar: CalendarConfig;
  years: YearsConfig;
  dates: DatesConfig;
}

export type DatePart = 'year' | 'month' | 'date';
