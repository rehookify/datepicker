import type { DPUseDatePicker } from './types';
import { useCalendars } from './use-calendars';
import { useDatePickerOffsetPropGetters } from './use-date-picker-offset';
import { useDatePickerState } from './use-date-picker-state';
import { useDays, useDaysPropGetters } from './use-days';
import { useMonths, useMonthsPropGetters } from './use-months';
import { useTime, useTimePropGetter } from './use-time';
import { useYears, useYearsPropGetters } from './use-years';

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
      ...useDatePickerOffsetPropGetters(dpState),
    },
  };
};
