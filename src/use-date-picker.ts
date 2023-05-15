import type { DPUseDatePicker } from './types';
import { useCalendars } from './use-calendars';
import { useDatePickerState } from './use-date-picker-state';
import { useDays, useDaysPropGetters } from './use-days';
import {
  useMonths,
  useMonthsActions,
  useMonthsPropGetters,
} from './use-months';
import { useTime, useTimePropGetter } from './use-time';
import { useYears, useYearsActions, useYearsPropGetters } from './use-years';

export const useDatePicker: DPUseDatePicker = (config) => {
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
