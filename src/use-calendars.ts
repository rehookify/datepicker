import { State } from './state-reducer';
import { createCalendars } from './utils/create-calendars';

import { createWeekdays } from './utils/create-weekdays';

export const useCalendars = ({
  offsetDate,
  selectedDates,
  rangeEnd,
  config,
}: State) => {
  const { locale, dates, calendar } = config;

  const calendars = createCalendars(
    offsetDate,
    selectedDates,
    rangeEnd,
    locale,
    dates,
    calendar,
  );

  const weekDays = createWeekdays(calendars[0], locale);

  return {
    calendars,
    weekDays,
  };
};
