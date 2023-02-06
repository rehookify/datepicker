import { DatePickerUserConfig } from './types';
import { useCalendars } from './use-calendars';
import { useDatePickerState } from './use-date-picker-state';
import { useDays, useDaysPropGetters } from './use-days';
import {
  useMonthsActions,
  useMonthsPropGetters,
  useMonths,
} from './use-months';
import { useTime, useTimePropGetter } from './use-time';
import { useYears, useYearsActions, useYearsPropGetters } from './use-years';

interface Data
  extends ReturnType<typeof useCalendars>,
    ReturnType<typeof useDays>,
    ReturnType<typeof useMonths>,
    ReturnType<typeof useTime>,
    ReturnType<typeof useYears> {}

interface PropGetters
  extends ReturnType<typeof useDaysPropGetters>,
    ReturnType<typeof useMonthsPropGetters>,
    ReturnType<typeof useTimePropGetter>,
    ReturnType<typeof useYearsPropGetters> {}

interface Actions
  extends ReturnType<typeof useMonthsActions>,
    ReturnType<typeof useYearsActions> {}
export interface UseDatePickerValue {
  data: Data;
  propGetters: PropGetters;
  actions: Actions;
}

export const useDatePicker = (
  config?: DatePickerUserConfig,
): UseDatePickerValue => {
  const dpState = useDatePickerState(config);

  return {
    data: {
      ...useCalendars(dpState),
      ...useDays(dpState),
      ...useMonths(dpState),
      ...useTime(dpState),
      ...useYears(dpState),
    },
    propGetters: {
      ...useDaysPropGetters(dpState),
      ...useMonthsPropGetters(dpState),
      ...useTimePropGetter(dpState),
      ...useYearsPropGetters(dpState),
    },
    actions: {
      ...useMonthsActions(dpState),
      ...useYearsActions(dpState),
    },
  };
};
