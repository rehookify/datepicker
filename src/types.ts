import type { MouseEvent } from 'react';

export interface CalendarDay {
  $date: Date;
  date: string;
  day: string;
  currentDisplayedMonth: boolean;
  isSelected: boolean;
  isToday: boolean;
  inRange: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  willBeInRange: boolean;
}

export interface CalendarMonth {
  $date: Date;
  name: string;
  isSelected: boolean;
  isActive: boolean;
}

export interface CalendarYear {
  $date: Date;
  value: number;
  isSelected: boolean;
  isActive: boolean;
}

export interface PropsGetterConfig extends Record<string, unknown> {
  onClick?(day?: Date, evt?: MouseEvent<HTMLElement>): void;
  onClick?(evt?: MouseEvent<HTMLElement>): void;
  disabled?: boolean;
}

export type DatesMode = 'single' | 'multiple' | 'range';
export interface DatesUserConfig {
  mode: DatesMode;
  minDate: Date;
  maxDate: Date;
  selectedDate: Date | Date[];
  toggle?: boolean;
  limit?: number;
}

export type CalendarMode = 'static' | 'fluid';
export interface CalendarConfig {
  mode: CalendarMode;
  selectNow: boolean;
  offsets: number[];
}
export interface YearsConfig {
  numberOfYearsDisplayed: number;
  disablePagination: boolean;
}

export interface LocaleConfig {
  locale: Intl.LocalesArgument;
  options: Intl.DateTimeFormatOptions;
  monthName: Intl.DateTimeFormatOptions['month'];
  weekday: Intl.DateTimeFormatOptions['weekday'];
}

export interface DatePickerUserConfig {
  calendar?: Partial<CalendarConfig>;
  years?: Partial<YearsConfig>;
  dates?: Partial<DatesUserConfig>;
  locale?: Partial<LocaleConfig>;
}

export interface DatesConfig {
  mode: DatesMode;
  minDate: Date | null;
  maxDate: Date | null;
  selectedDates: Date[];
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

export interface Calendar {
  year: string;
  month: string;
  days: CalendarDay[];
}
