import { useMemo } from 'react';

import type { DPUseCalendars } from './types';
import { createCalendars } from './utils/create-calendars';
import { createWeekdays } from './utils/create-weekdays';

export const useCalendars: DPUseCalendars = (state) => {
  const calendars = createCalendars(state);

  return useMemo(
    () => ({
      calendars,
      weekDays: createWeekdays(calendars[0], state.config),
    }),
    [calendars, state.config],
  );
};
