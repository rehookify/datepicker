import { DatePickerUserConfig } from './types';
import { useCalendars } from './use-calendars';
import { useDatePickerState } from './use-date-picker-state';
import { useDays, useDaysActions, useDaysPropGetters } from './use-days';
import {
  useMonthsActions,
  useMonthsPropGetters,
  useMonths,
} from './use-months';
import { useYears, useYearsActions, useYearsPropGetters } from './use-years';

export const useDatePicker = (config?: DatePickerUserConfig) => {
  const [state, dispatch] = useDatePickerState(config);

  const { calendars, weekDays } = useCalendars(state);
  const { selectedDates, formattedDates } = useDays(state);
  const { dayButton } = useDaysPropGetters(state, dispatch);
  const { setDay, setRangeEnd } = useDaysActions(dispatch);
  const { months } = useMonths(state);
  const { monthButton, nextMonthButton, previousMonthButton } =
    useMonthsPropGetters(state, dispatch);
  const { setMonth, setNextMonth, setPreviousMonth } = useMonthsActions(
    state,
    dispatch,
  );
  const { years } = useYears(state);
  const { yearButton, nextYearsButton, previousYearsButton } =
    useYearsPropGetters(state, dispatch);
  const { setYear, setNextYears, setPreviousYears } = useYearsActions(
    state,
    dispatch,
  );

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
      setDay,
      setMonth,
      setNextMonth,
      setPreviousMonth,
      setYear,
      setNextYears,
      setPreviousYears,
      setRangeEnd,
    },
  };
};
