import { useCallback } from 'react';

import { setOffset, setYear } from './state-reducer';
import type {
  DPPropsGetterConfig,
  DPUseYears,
  DPUseYearsActions,
  DPUseYearsPropGetters,
  DPYear,
} from './types';
import { callAll, skipAll, skipFirst } from './utils/call-all';
import { createPropGetter } from './utils/create-prop-getter';
import { createYears } from './utils/create-years';
import { getDateParts, newDate } from './utils/date';
import { isExactMode } from './utils/get-current-year-position';
import { isSame, maxDateAndAfter, minDateAndBefore } from './utils/predicates';

export const useYears: DPUseYears = ({
  selectedDates,
  state: {
    offsetDate,
    offsetYear,
    config: { years, dates },
  },
}) => ({
  years: createYears(offsetYear, offsetDate, selectedDates, years, dates),
});

export const useYearsPropGetters: DPUseYearsPropGetters = ({
  state: {
    offsetYear,
    offsetDate,
    config: { dates, years: yearsConfig },
  },
  dispatch,
}) => {
  const { minDate, maxDate } = dates;
  const { step, numberOfYears, mode } = yearsConfig;
  const { D, M } = getDateParts(offsetDate);

  const callSetOffset = useCallback(
    (d: Date) => setOffset(dispatch, d),
    [dispatch],
  );

  const yearButton = useCallback(
    (
      { $date, disabled }: DPYear,
      { onClick, disabled: disabledProps, ...rest }: DPPropsGetterConfig = {},
    ) =>
      createPropGetter(
        !!disabledProps || disabled,
        (evt) => callAll(onClick, skipFirst(callSetOffset))(evt, $date),
        rest,
      ),
    [callSetOffset],
  );

  const nextYearsButton = useCallback(
    ({ onClick, disabled, ...rest }: DPPropsGetterConfig = {}) => {
      const endYearDate = newDate(offsetYear + numberOfYears - 1, M, D);
      const isDisabled =
        !!disabled ||
        maxDateAndAfter(maxDate, endYearDate) ||
        (isExactMode(mode) && !!maxDate && isSame(maxDate, endYearDate));

      return createPropGetter(
        isDisabled,
        (evt) =>
          callAll(
            onClick,
            skipAll(() => setYear(dispatch, offsetYear + step)),
          )(evt),
        rest,
      );
    },
    [maxDate, dispatch, offsetYear, step, D, M, numberOfYears, mode],
  );

  const previousYearsButton = useCallback(
    ({ onClick, disabled, ...rest }: DPPropsGetterConfig = {}) => {
      const isDisabled =
        !!disabled || minDateAndBefore(minDate, newDate(offsetYear, M, D));

      return createPropGetter(
        isDisabled,
        (evt) =>
          callAll(
            onClick,
            skipAll(() => setYear(dispatch, offsetYear - step)),
          )(evt),
        rest,
      );
    },
    [minDate, dispatch, offsetYear, step, M, D],
  );

  return {
    yearButton,
    nextYearsButton,
    previousYearsButton,
  };
};

export const useYearsActions: DPUseYearsActions = ({
  state: {
    offsetYear,
    config: { years },
  },
  dispatch,
}) => {
  const { step } = years;
  const setYearAction = useCallback(
    (d: Date) => setOffset(dispatch, d),
    [dispatch],
  );

  const setNextYears = useCallback(
    () => setYear(dispatch, offsetYear + step),
    [offsetYear, step, dispatch],
  );

  const setPreviousYears = useCallback(
    () => setYear(dispatch, offsetYear - step),
    [offsetYear, step, dispatch],
  );

  return {
    setYear: setYearAction,
    setNextYears,
    setPreviousYears,
  };
};
