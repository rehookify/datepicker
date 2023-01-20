import { DatePickerUserConfig } from './types';
import { useCalendars } from './use-calendars';
import { useDatePickerState } from './use-date-picker-state';
import { useDays, useDaysPropGetters } from './use-days';
import {
  useMonthsActions,
  useMonthsPropGetters,
  useMonths,
} from './use-months';
import { useYears, useYearsActions, useYearsPropGetters } from './use-years';

export const useDatePicker = (config?: DatePickerUserConfig) => {
  const dpState = useDatePickerState(config);

  const { calendars, weekDays } = useCalendars(dpState);
  const { selectedDates, formattedDates } = useDays(dpState);
  const { dayButton } = useDaysPropGetters(dpState);
  const { months } = useMonths(dpState);
  const { monthButton, nextMonthButton, previousMonthButton } =
    useMonthsPropGetters(dpState);
  const { setMonth, setNextMonth, setPreviousMonth } =
    useMonthsActions(dpState);
  const { years } = useYears(dpState);
  const { yearButton, nextYearsButton, previousYearsButton } =
    useYearsPropGetters(dpState);
  const { setYear, setNextYears, setPreviousYears } = useYearsActions(dpState);

  return {
    data: {
      calendars,
      weekDays,
      months,
      years,
      selectedDates,
      formattedDates,
    },
    propGetters: {
      nextMonthButton,
      previousMonthButton,
      dayButton,
      monthButton,
      yearButton,
      nextYearsButton,
      previousYearsButton,
    },
    actions: {
      setMonth,
      setNextMonth,
      setPreviousMonth,
      setYear,
      setNextYears,
      setPreviousYears,
    },
  };
};
