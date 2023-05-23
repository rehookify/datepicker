import { useCallback } from 'react';

import { setMaxDate, setMinDate } from './state-reducer';
import type { DPUseCalendarActions, DPUseCalendars } from './types';
import { createCalendars } from './utils/create-calendars';
import { createWeekdays } from './utils/create-weekdays';

export const useCalendars: DPUseCalendars = ({ selectedDates, state }) => {
  const calendars = createCalendars(selectedDates, state);

  return {
    calendars,
    weekDays: createWeekdays(calendars[0], state.config),
  };
};

export const useCalendarActions: DPUseCalendarActions = ({
  state: { config },
  dispatch,
}) => {
  const { minDate, maxDate } = config.dates;

  const setMinDateAction = useCallback(
    (minDate: Date) => setMinDate(dispatch, minDate),
    [minDate],
  );

  const setMaxDateAction = useCallback(
    (maxDate: Date) => setMaxDate(dispatch, maxDate),
    [maxDate],
  );

  return {
    setMinDate: setMinDateAction,
    setMaxDate: setMaxDateAction,
  };
};
