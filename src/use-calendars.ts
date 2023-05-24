import type { DPUseCalendars } from './types';
import { createCalendars } from './utils/create-calendars';
import { createWeekdays } from './utils/create-weekdays';

export const useCalendars: DPUseCalendars = (state) => {
  const calendars = createCalendars(state);

  return {
    calendars,
    weekDays: createWeekdays(calendars[0], state.config),
  };
};
