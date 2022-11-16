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
  locale: LocaleConfig,
) => CalendarDay;

export type CreateCalendarMonth = (
  day: Date,
  currentDate: Date,
  selectedDates: Date[],
  locale: LocaleConfig,
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
  minDate?: Date;
  maxDate?: Date;
  selectedDate?: Date | Date[];
  toggle?: boolean;
  limit?: number;
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

export interface LocaleConfig {
  locale?: Intl.LocalesArgument;
  options?: Intl.DateTimeFormatOptions;
  monthName: Intl.DateTimeFormatOptions['month'];
}

export interface DatePickerUserConfig {
  calendar?: CalendarConfig;
  years?: YearsConfig;
  dates?: DatesUserConfig;
  locale?: LocaleConfig;
}

export interface DatesConfig {
  mode: DatesMode;
  minDate: Date | null;
  maxDate: Date | null;
  selectedDates: Date[] | null;
  toggle: boolean;
  limit: number;
}

export interface DatePickerConfig {
  calendar: CalendarConfig;
  years: YearsConfig;
  dates: DatesConfig;
  locale: LocaleConfig;
}

export type DatePart = 'year' | 'month' | 'date';
