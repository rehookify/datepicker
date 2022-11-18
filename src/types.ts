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
  onClick?(evt?: MouseEvent<HTMLElement>, date?: Date): void;
  disabled?: boolean;
}

export type DatesMode = 'single' | 'multiple' | 'range';
export interface DatesUserConfig {
  mode: DatesMode;
  minDate: Date;
  maxDate: Date;
  selectedDates: Date | Date[];
  toggle?: boolean;
  limit?: number;
}

export type CalendarMode = 'static' | 'fluid';
export interface CalendarConfig {
  mode: CalendarMode;
  offsets: number[];
}
export interface YearsConfig {
  numberOfYearsDisplayed: number;
}

export interface LocaleConfig {
  locale: Intl.LocalesArgument;
  options?: Intl.DateTimeFormatOptions;
  day: Intl.DateTimeFormatOptions['day'];
  year: Intl.DateTimeFormatOptions['year'];
  monthName: Intl.DateTimeFormatOptions['month'];
  weekday: Intl.DateTimeFormatOptions['weekday'];
}

export interface DatePickerUserConfig {
  locale?: Partial<LocaleConfig>;
  calendar?: Partial<CalendarConfig>;
  dates?: Partial<DatesUserConfig>;
  years?: Partial<YearsConfig>;
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
  locale: LocaleConfig;
  calendar: CalendarConfig;
  dates: DatesConfig;
  years: YearsConfig;
}

export type DatePart = 'year' | 'month' | 'date';

export interface Calendar {
  year: string;
  month: string;
  days: CalendarDay[];
}
