import { useDatePickerStateContext } from './date-picker-state-provider';
import { useCalendars } from './use-calendars';
import { useDays, useDaysActions, useDaysPropGetters } from './use-days';
import {
  useMonths,
  useMonthsActions,
  useMonthsPropGetters,
} from './use-months';
import { useYears, useYearsActions, useYearsPropGetters } from './use-years';

export const useContextCalendars = () => {
  const { s } = useDatePickerStateContext();

  return useCalendars(s);
};

export const useContextDays = () => {
  const { s } = useDatePickerStateContext();

  return useDays(s);
};

export const useContextDaysPropGetters = () => {
  const { s, d } = useDatePickerStateContext();

  return useDaysPropGetters(s, d);
};

export const useContextDaysActions = () => {
  const { d } = useDatePickerStateContext();

  return useDaysActions(d);
};

export const useContextMonths = () => {
  const { s } = useDatePickerStateContext();

  return useMonths(s);
};

export const useContextMonthsPropGetters = () => {
  const { s, d } = useDatePickerStateContext();

  return useMonthsPropGetters(s, d);
};

export const useContextMonthsActions = () => {
  const { s, d } = useDatePickerStateContext();

  return useMonthsActions(s, d);
};

export const useContextYears = () => {
  const { s } = useDatePickerStateContext();

  return useYears(s);
};

export const useContextYearsPropGetters = () => {
  const { s, d } = useDatePickerStateContext();

  return useYearsPropGetters(s, d);
};

export const useContextYearsActions = () => {
  const { s, d } = useDatePickerStateContext();

  return useYearsActions(s, d);
};
