import type { MouseEvent, Dispatch } from 'react';
import { Action, State } from './state-reducer';

export type DayRange =
  | 'in-range'
  | 'range-start'
  | 'range-end'
  | 'range-start range-end'
  | 'will-be-in-range'
  | 'will-be-range-start'
  | 'will-be-range-end'
  | '';

export interface CalendarDay {
  $date: Date;
  day: string;
  disabled: boolean;
  inCurrentMonth: boolean;
  now: boolean;
  range: DayRange;
  selected: boolean;
}

export interface CalendarMonth {
  $date: Date;
  active: boolean;
  disabled: boolean;
  month: string;
  now: boolean;
  selected: boolean;
}

export interface CalendarYear {
  $date: Date;
  active: boolean;
  disabled: boolean;
  now: boolean;
  selected: boolean;
  year: number;
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
  selectSameDate: boolean;
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
  hour: Intl.DateTimeFormatOptions['hour'];
  minute: Intl.DateTimeFormatOptions['minute'];
  second?: Intl.DateTimeFormatOptions['second'];
  hour12?: Intl.DateTimeFormatOptions['hour12'];
}

export interface TimeLimit {
  h: number;
  m: number;
}
export interface TimeConfig {
  interval: number;
  minTime: TimeLimit;
  maxTime: TimeLimit;
}

export interface DatePickerUserConfig {
  selectedDates?: Date[];
  focusDate?: Date | null;
  onDatesChange?(d: Date[]): void;
  locale?: Partial<LocaleConfig>;
  calendar?: Partial<CalendarConfig>;
  dates?: Partial<DatesUserConfig>;
  years?: Partial<YearsConfig>;
  time?: Partial<TimeConfig>;
}

export interface DatesConfig {
  mode: DatesMode;
  minDate: Date | null;
  maxDate: Date | null;
  toggle: boolean;
  limit: number;
  selectSameDate: boolean;
}

export interface DatePickerConfig {
  selectedDates: Date[];
  focusDate: Date | null;
  onDatesChange?(d: Date[]): void;
  locale: LocaleConfig;
  calendar: CalendarConfig;
  dates: DatesConfig;
  years: YearsConfig;
  time: TimeConfig;
}

export type DatePart = 'year' | 'month' | 'date';

export interface Calendar {
  year: string;
  month: string;
  days: CalendarDay[];
}

export interface DPState {
  dispatch: Dispatch<Action>;
  state: State;
  selectedDates: Date[];
}

export interface Time {
  $date: Date;
  disabled: boolean;
  selected: boolean;
  time: string;
}
