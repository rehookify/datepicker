import { DPState } from './types';
import { createCalendars } from './utils/create-calendars';
import { createWeekdays } from './utils/create-weekdays';

export const useCalendars = ({ selectedDates, state }: DPState) => {
  const calendars = createCalendars(selectedDates, state);

  return {
    calendars,
    weekDays: createWeekdays(calendars[0], state.config),
  };
};
