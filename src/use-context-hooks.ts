import { useDatePickerStateContext } from './date-picker-state-provider';
import { useCalendars } from './use-calendars';
import { useDays, useDaysPropGetters } from './use-days';
import {
  useMonths,
  useMonthsActions,
  useMonthsPropGetters,
} from './use-months';
import { useYears, useYearsActions, useYearsPropGetters } from './use-years';

export const useContextCalendars = () => {
  const s = useDatePickerStateContext();

  return useCalendars(s);
};

export const useContextDays = () => {
  const s = useDatePickerStateContext();

  return useDays(s);
};

export const useContextDaysPropGetters = () => {
  const s = useDatePickerStateContext();

  return useDaysPropGetters(s);
};

export const useContextMonths = () => {
  const s = useDatePickerStateContext();

  return useMonths(s);
};

export const useContextMonthsPropGetters = () => {
  const s = useDatePickerStateContext();

  return useMonthsPropGetters(s);
};

export const useContextMonthsActions = () => {
  const s = useDatePickerStateContext();

  return useMonthsActions(s);
};

export const useContextYears = () => {
  const s = useDatePickerStateContext();

  return useYears(s);
};

export const useContextYearsPropGetters = () => {
  const s = useDatePickerStateContext();

  return useYearsPropGetters(s);
};

export const useContextYearsActions = () => {
  const s = useDatePickerStateContext();

  return useYearsActions(s);
};
