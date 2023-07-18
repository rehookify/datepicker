import { useDatePickerStateContext } from './date-picker-state-provider';
import type {
  DPUseContextCalendars,
  DPUseContextDatePickerOffsetPropGetters,
  DPUseContextDays,
  DPUseContextDaysPropGetters,
  DPUseContextMonths,
  DPUseContextMonthsPropGetters,
  DPUseContextTime,
  DPUseContextTimePropGetters,
  DPUseContextYears,
  DPUseContextYearsPropGetters,
} from './types';
import { useCalendars } from './use-calendars';
import { useDatePickerOffsetPropGetters } from './use-date-picker-offset';
import { useDays, useDaysPropGetters } from './use-days';
import { useMonths, useMonthsPropGetters } from './use-months';
import { useTime, useTimePropGetter } from './use-time';
import { useYears, useYearsPropGetters } from './use-years';

export const useContextCalendars: DPUseContextCalendars = () =>
  useCalendars(useDatePickerStateContext());

export const useContextDays: DPUseContextDays = () =>
  useDays(useDatePickerStateContext());

export const useContextDaysPropGetters: DPUseContextDaysPropGetters = () =>
  useDaysPropGetters(useDatePickerStateContext());

export const useContextMonths: DPUseContextMonths = () =>
  useMonths(useDatePickerStateContext());

export const useContextMonthsPropGetters: DPUseContextMonthsPropGetters = () =>
  useMonthsPropGetters(useDatePickerStateContext());

export const useContextTime: DPUseContextTime = () =>
  useTime(useDatePickerStateContext());

export const useContextTimePropGetters: DPUseContextTimePropGetters = () =>
  useTimePropGetter(useDatePickerStateContext());

export const useContextYears: DPUseContextYears = () =>
  useYears(useDatePickerStateContext());

export const useContextYearsPropGetters: DPUseContextYearsPropGetters = () =>
  useYearsPropGetters(useDatePickerStateContext());

export const useContextDatePickerOffsetPropGetters: DPUseContextDatePickerOffsetPropGetters =
  () => useDatePickerOffsetPropGetters(useDatePickerStateContext());
