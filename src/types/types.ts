import type { Dispatch, MouseEvent } from 'react';

import { Action, State } from '../state-reducer';
import { DatesConfig, DatesUserConfig } from './date';
import { DPExcludeConfiguration } from './exclude';

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

export interface MonthsPropGettersConfig extends PropsGetterConfig {
  step?: number;
}

export type CalendarMode = 'static' | 'fluid';
export interface CalendarConfig {
  mode: CalendarMode;
  offsets: number[];
  startDay: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

export type YearsMode = 'decade' | 'fluid' | 'exact';

export interface YearsConfig {
  numberOfYears: number;
  mode: YearsMode;
  step: number;
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
  minTime?: TimeLimit;
  maxTime?: TimeLimit;
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
  exclude?: DPExcludeConfiguration;
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
  exclude?: DPExcludeConfiguration;
}

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
  now: boolean;
  selected: boolean;
  time: string;
}
