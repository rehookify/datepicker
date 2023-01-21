import type { MouseEvent, Dispatch } from 'react';
import { Action, State } from './state-reducer';

export type DayRange =
  | 'in-range'
  | 'range-start'
  | 'range-end'
  | 'will-be-in-range'
  | 'will-be-range-start'
  | 'will-be-range-end'
  | '';

export interface CalendarDay {
  $date: Date;
  date: string;
  day: string;
  isToday: boolean;
  range: DayRange;
  disabled: boolean;
  selected: boolean;
  inCurrentMonth: boolean;
}

export interface CalendarMonth {
  $date: Date;
  name: string;
  disabled: boolean;
  active: boolean;
  selected: boolean;
}

export interface CalendarYear {
  $date: Date;
  value: number;
  selected: boolean;
  active: boolean;
  disabled: boolean;
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
  startDay: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

export type YearsMode = 'decade' | 'fluid';

// @TODO remove after v2.0.0
interface GeneralYearsConfig {
  numberOfYearsDisplayed?: number;
  mode: YearsMode;
  step: number;
}
export interface YearsConfig extends GeneralYearsConfig {
  numberOfYears: number;
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
  selectedDates?: Date[];
  onDatesChange?(d: Date[]): void;
  locale?: Partial<LocaleConfig>;
  calendar?: Partial<CalendarConfig>;
  dates?: Partial<DatesUserConfig>;
  years?: Partial<YearsConfig>;
}

export interface DatesConfig {
  mode: DatesMode;
  minDate: Date | null;
  maxDate: Date | null;
  toggle: boolean;
  limit: number;
}

export interface DatePickerConfig {
  selectedDates: Date[];
  onDatesChange?(d: Date[]): void;
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

export interface DPState {
  state: State;
  dispatch: Dispatch<Action>;
  selectedDates: Date[];
}
