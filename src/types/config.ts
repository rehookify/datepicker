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

export interface DPDatesUserConfig extends Partial<DPDatesConfig> {
  selectedDates: Date | Date[];
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
  selectedDates?: Date[];
  focusDate?: Date | null;
  onDatesChange?(d: Date[]): void;
  locale?: Partial<DPLocaleConfig>;
  calendar?: Partial<DPCalendarConfig>;
  dates?: Partial<DPDatesUserConfig>;
  years?: Partial<DPYearsConfig>;
  time?: Partial<DPTimeConfig>;
  exclude?: DPExcludeConfig;
}

export interface DPConfig {
  selectedDates: Date[];
  focusDate: Date | null;
  onDatesChange?(d: Date[]): void;
  locale: DPLocaleConfig;
  calendar: DPCalendarConfig;
  dates: DPDatesConfig;
  years: DPYearsConfig;
  time: DPTimeConfig;
  exclude?: DPExcludeConfig;
}
