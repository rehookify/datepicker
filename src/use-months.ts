import { useCallback } from 'react';
import { setOffset } from './state-reducer';
import { CalendarMonth, DPState, PropsGetterConfig } from './types';
import { callAll, skipFirst } from './utils/call-all';
import { createMonths } from './utils/create-months';
import { createPropGetter } from './utils/create-prop-getter';
import {
  addToDate,
  getFirstDayOfTheMonth,
  subtractFromDate,
} from './utils/date';
import { maxDateAndAfter, minDateAndBeforeFirstDay } from './utils/predicates';

export const useMonths = ({
  selectedDates,
  state: {
    offsetDate,
    config: { locale, dates },
  },
}: DPState) => ({
  months: createMonths(offsetDate, selectedDates, locale, dates),
});

export const useMonthsPropGetters = ({
  state: {
    offsetDate,
    config: { dates },
  },
  dispatch,
}: DPState) => {
  const { minDate, maxDate } = dates;

  const callSetOffset = useCallback(
    (d: Date) => setOffset(dispatch, d),
    [dispatch],
  );

  const monthButton = useCallback(
    (
      { $date, disabled }: CalendarMonth,
      { onClick, disabled: disabledProps, ...rest }: PropsGetterConfig = {},
    ) =>
      createPropGetter(
        !!disabledProps || disabled,
        (evt) => callAll(onClick, skipFirst(callSetOffset))(evt, $date),
        rest,
      ),
    [callSetOffset],
  );

  const nextMonthButton = useCallback(
    ({ onClick, disabled, ...rest }: PropsGetterConfig = {}) => {
      const nextMonth = addToDate(offsetDate, 1, 'month');
      const isDisabled =
        !!disabled ||
        maxDateAndAfter(maxDate, getFirstDayOfTheMonth(nextMonth));

      return createPropGetter(
        isDisabled,
        (evt) => callAll(onClick, skipFirst(callSetOffset))(evt, nextMonth),
        rest,
      );
    },
    [offsetDate, maxDate, callSetOffset],
  );

  const previousMonthButton = useCallback(
    ({ onClick, disabled, ...rest }: PropsGetterConfig = {}) => {
      const nextMonth = subtractFromDate(offsetDate, 1, 'month');
      const isDisabled =
        !!disabled || minDateAndBeforeFirstDay(minDate, nextMonth);

      return createPropGetter(
        isDisabled,
        (evt) => callAll(onClick, skipFirst(callSetOffset))(evt, nextMonth),
        rest,
      );
    },
    [offsetDate, minDate, callSetOffset],
  );

  return { monthButton, nextMonthButton, previousMonthButton };
};

export const useMonthsActions = ({
  state: { offsetDate },
  dispatch,
}: DPState) => {
  const setMonth = useCallback((d: Date) => setOffset(dispatch, d), [dispatch]);

  const setNextMonth = useCallback(
    () => setMonth(addToDate(offsetDate, 1, 'month')),
    [offsetDate, setMonth],
  );

  const setPreviousMonth = useCallback(
    () => setMonth(subtractFromDate(offsetDate, 1, 'month')),
    [offsetDate, setMonth],
  );

  return {
    setMonth,
    setNextMonth,
    setPreviousMonth,
  };
};
