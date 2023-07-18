import { DPDateExclude, DPDatesMode } from './date';
import { DPDayInteger } from './day';
import { DPTimeLimit } from './time';
import { DPYearsMode } from './year';

export interface DPCalendarConfig {
  mode: 'static' | 'fluid';
  offsets: number[];
  startDay: DPDayInteger;
}

export interface DPDatesConfig {
  mode: DPDatesMode;
  minDate?: Date;
  maxDate?: Date;
  toggle: boolean;
  limit?: number;
  selectSameDate: boolean;
  exclude?: DPDateExclude;
}

export interface DPYearsConfig {
  numberOfYears: number;
  mode: DPYearsMode;
  step: number;
}

export interface DPExcludeConfig {
  day?: DPDayInteger[];
  date?: Date[];
  // month?: DPMonthInteger[];
  // monthDate?: Date[];
  // year?: number[];
}

export interface DPLocaleConfig {
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

export interface DPTimeConfig {
  interval: number;
  minTime?: DPTimeLimit;
  maxTime?: DPTimeLimit;
}

export interface DPUserConfig {
  calendar?: Partial<DPCalendarConfig>;
  dates?: Partial<DPDatesConfig>;
  exclude?: DPExcludeConfig;
  focusDate?: Date;
  locale?: Partial<DPLocaleConfig>;
  offsetDate?: Date;
  onOffsetChange?(d: Date): void;
  onDatesChange(d: Date[]): void;
  selectedDates: Date[];
  time?: Partial<DPTimeConfig>;
  years?: Partial<DPYearsConfig>;
}

export interface DPConfig {
  calendar: DPCalendarConfig;
  dates: DPDatesConfig;
  exclude?: DPExcludeConfig;
  focusDate?: Date;
  locale: DPLocaleConfig;
  offsetDate?: Date;
  onOffsetChange?(d: Date): void;
  onDatesChange(d: Date[]): void;
  selectedDates: Date[];
  time: DPTimeConfig;
  years: DPYearsConfig;
}
