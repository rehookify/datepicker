import { useCallback } from 'react';

import { setOffset } from './state-reducer';
import type {
  DPMonth,
  DPMonthsPropGettersConfig,
  DPPropsGetterConfig,
  DPUseMonths,
  DPUseMonthsActions,
  DPUseMonthsPropGetters,
} from './types';
import { callAll, skipFirst } from './utils/call-all';
import { createMonths } from './utils/create-months';
import { createPropGetter } from './utils/create-prop-getter';
import {
  addToDate,
  getFirstDayOfTheMonth,
  subtractFromDate,
} from './utils/date';
import { maxDateAndAfter, minDateAndBeforeFirstDay } from './utils/predicates';

export const useMonths: DPUseMonths = ({
  selectedDates,
  state: {
    offsetDate,
    config: { locale, dates },
  },
}) => ({
  months: createMonths(offsetDate, selectedDates, locale, dates),
});

export const useMonthsPropGetters: DPUseMonthsPropGetters = ({
  state: {
    offsetDate,
    config: { dates },
  },
  dispatch,
}) => {
  const { minDate, maxDate } = dates;

  const callSetOffset = useCallback(
    (d: Date) => setOffset(dispatch, d),
    [dispatch],
  );

  const monthButton = useCallback(
    (
      { $date, disabled, selected }: DPMonth,
      { onClick, disabled: disabledProps, ...rest }: DPPropsGetterConfig = {},
    ) =>
      createPropGetter(
        !!disabledProps || disabled,
        (evt) => callAll(onClick, skipFirst(callSetOffset))(evt, $date),
        rest,
        selected,
      ),
    [callSetOffset],
  );

  const nextMonthButton = useCallback(
    ({
      onClick,
      disabled,
      step = 1,
      ...rest
    }: DPMonthsPropGettersConfig = {}) => {
      const nextMonth = addToDate(offsetDate, step, 'month');
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
    ({
      onClick,
      disabled,
      step = 1,
      ...rest
    }: DPMonthsPropGettersConfig = {}) => {
      const nextMonth = subtractFromDate(offsetDate, step, 'month');
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

export const useMonthsActions: DPUseMonthsActions = ({
  state: { offsetDate },
  dispatch,
}) => {
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
