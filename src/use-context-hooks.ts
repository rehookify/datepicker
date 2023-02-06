import { useDatePickerStateContext } from './date-picker-state-provider';
import { useCalendars } from './use-calendars';
import { useDays, useDaysPropGetters } from './use-days';
import {
  useMonths,
  useMonthsActions,
  useMonthsPropGetters,
} from './use-months';
import { useTime, useTimePropGetter } from './use-time';
import { useYears, useYearsActions, useYearsPropGetters } from './use-years';

export const useContextCalendars = () =>
  useCalendars(useDatePickerStateContext());

export const useContextDays = () => useDays(useDatePickerStateContext());

export const useContextDaysPropGetters = () =>
  useDaysPropGetters(useDatePickerStateContext());

export const useContextMonths = () => useMonths(useDatePickerStateContext());

export const useContextMonthsPropGetters = () =>
  useMonthsPropGetters(useDatePickerStateContext());

export const useContextMonthsActions = () =>
  useMonthsActions(useDatePickerStateContext());

export const useContextYears = () => useYears(useDatePickerStateContext());

export const useContextYearsPropGetters = () =>
  useYearsPropGetters(useDatePickerStateContext());

export const useContextYearsActions = () =>
  useYearsActions(useDatePickerStateContext());

export const useContextTime = () => useTime(useDatePickerStateContext());

export const useContextTimePropGetters = () =>
  useTimePropGetter(useDatePickerStateContext());
