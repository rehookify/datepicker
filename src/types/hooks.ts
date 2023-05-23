import { DPCalendar } from './calendar';
import { DPUserConfig } from './config';
import { DPDay } from './day';
import { DPMonth } from './month';
import {
  DPMonthsPropGettersConfig,
  DPPropGetter,
  DPPropsGetterConfig,
} from './prop-getters';
import { DPState } from './state';
import { DPTime } from './time';
import { DPYear } from './year';

export type DPUseCalendars = (state: DPState) => {
  calendars: DPCalendar[];
  weekDays: string[];
};

export type DPUseDays = (state: DPState) => {
  selectedDates: Date[];
  formattedDates: string[];
};

export type DPUseCalendarActions = (state: DPState) => {
  setMinDate: (d: Date) => void;
  setMaxDate: (d: Date) => void;
};

export type DPUseDaysPropGetters = (state: DPState) => {
  dayButton: (day: DPDay, config?: DPPropsGetterConfig) => DPPropGetter;
};

export type DPUseMonths = (state: DPState) => {
  months: DPMonth[];
};

export type DPUseMonthsPropGetters = (state: DPState) => {
  monthButton: (month: DPMonth, config?: DPPropsGetterConfig) => DPPropGetter;
  nextMonthButton: (config?: DPMonthsPropGettersConfig) => DPPropGetter;
  previousMonthButton: (config?: DPMonthsPropGettersConfig) => DPPropGetter;
};

export type DPUseMonthsActions = (state: DPState) => {
  setMonth: (d: Date) => void;
  setNextMonth: () => void;
  setPreviousMonth: () => void;
};

export type DPUseTime = (state: DPState) => {
  time: DPTime[];
};

export type DPUseTimePropGetter = (state: DPState) => {
  timeButton: (time: DPTime, config?: DPPropsGetterConfig) => DPPropGetter;
};

export type DPUseYears = (state: DPState) => {
  years: DPYear[];
};

export type DPUseYearsPropGetters = (state: DPState) => {
  yearButton: (year: DPYear, config?: DPPropsGetterConfig) => DPPropGetter;
  nextYearsButton: (config?: DPPropsGetterConfig) => DPPropGetter;
  previousYearsButton: (config?: DPPropsGetterConfig) => DPPropGetter;
};

export type DPUseYearsActions = (state: DPState) => {
  setYear: (d: Date) => void;
  setNextYears: () => void;
  setPreviousYears: () => void;
};

export interface DPData
  extends ReturnType<DPUseCalendars>,
    ReturnType<DPUseDays>,
    ReturnType<DPUseMonths>,
    ReturnType<DPUseTime>,
    ReturnType<DPUseYears> {}

export interface DPPropGetters
  extends ReturnType<DPUseDaysPropGetters>,
    ReturnType<DPUseMonthsPropGetters>,
    ReturnType<DPUseTimePropGetter>,
    ReturnType<DPUseYearsPropGetters> {}

export interface DPActions
  extends ReturnType<DPUseMonthsActions>,
    ReturnType<DPUseYearsActions> {}

export type DPUseDatePicker = (config?: DPUserConfig) => {
  data: DPData;
  propGetters: DPPropGetters;
  actions: DPActions;
};

export type DPUseContextCalendars = () => ReturnType<DPUseCalendars>;

export type DPUseContextDays = () => ReturnType<DPUseDays>;
export type DPUseContextDaysPropGetters =
  () => ReturnType<DPUseDaysPropGetters>;

export type DPUseContextMonths = () => ReturnType<DPUseMonths>;
export type DPUseContextMonthsPropGetters =
  () => ReturnType<DPUseMonthsPropGetters>;
export type DPUseContextMonthsActions = () => ReturnType<DPUseMonthsActions>;

export type DPUseContextTime = () => ReturnType<DPUseTime>;
export type DPUseContextTimePropGetters = () => ReturnType<DPUseTimePropGetter>;

export type DPUseContextYears = () => ReturnType<DPUseYears>;
export type DPUseContextYearsPropGetters =
  () => ReturnType<DPUseYearsPropGetters>;
export type DPUseContextYearsActions = () => ReturnType<DPUseYearsActions>;
