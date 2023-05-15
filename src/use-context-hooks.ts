import { useDatePickerStateContext } from './date-picker-state-provider';
import type {
  DPUseContextCalendars,
  DPUseContextDays,
  DPUseContextDaysPropGetters,
  DPUseContextMonths,
  DPUseContextMonthsActions,
  DPUseContextMonthsPropGetters,
  DPUseContextTime,
  DPUseContextTimePropGetters,
  DPUseContextYears,
  DPUseContextYearsActions,
  DPUseContextYearsPropGetters,
} from './types';
import { useCalendars } from './use-calendars';
import { useDays, useDaysPropGetters } from './use-days';
import {
  useMonths,
  useMonthsActions,
  useMonthsPropGetters,
} from './use-months';
import { useTime, useTimePropGetter } from './use-time';
import { useYears, useYearsActions, useYearsPropGetters } from './use-years';

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

export const useContextMonthsActions: DPUseContextMonthsActions = () =>
  useMonthsActions(useDatePickerStateContext());

export const useContextTime: DPUseContextTime = () =>
  useTime(useDatePickerStateContext());

export const useContextTimePropGetters: DPUseContextTimePropGetters = () =>
  useTimePropGetter(useDatePickerStateContext());

export const useContextYears: DPUseContextYears = () =>
  useYears(useDatePickerStateContext());

export const useContextYearsPropGetters: DPUseContextYearsPropGetters = () =>
  useYearsPropGetters(useDatePickerStateContext());

export const useContextYearsActions: DPUseContextYearsActions = () =>
  useYearsActions(useDatePickerStateContext());
