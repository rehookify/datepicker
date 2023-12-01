import { useCallback, useMemo } from 'react';

import { setYear } from './state-reducer';
import type {
  DPPropsGetterConfig,
  DPUseYears,
  DPUseYearsPropGetters,
  DPYear,
} from './types';
import { callAll, skipAll, skipFirst } from './utils/call-all';
import { createPropGetter } from './utils/create-prop-getter';
import { createYears } from './utils/create-years';
import { getDateParts, newDate } from './utils/date';
import { isExactMode } from './utils/get-current-year-position';
import { setDPOffset } from './utils/offset';
import { isSame, maxDateAndAfter, minDateAndBefore } from './utils/predicates';

export const useYears: DPUseYears = ({
  selectedDates,
  state: { offsetDate, offsetYear },
  config: { years, dates },
}) =>
  useMemo(
    () => ({
      years: createYears(offsetYear, offsetDate, selectedDates, years, dates),
    }),
    [offsetDate, offsetYear, selectedDates, years, dates],
  );

export const useYearsPropGetters: DPUseYearsPropGetters = (dpState) => {
  const {
    state: { offsetYear, offsetDate },
    config: { dates, years: yearsConfig },
    dispatch,
  } = dpState;
  const { minDate, maxDate } = dates;
  const { step, numberOfYears, mode } = yearsConfig;
  const { D, M } = getDateParts(offsetDate);

  const yearButton = useCallback(
    (
      { $date, disabled, selected, active }: DPYear,
      { onClick, disabled: disabledProps, ...rest }: DPPropsGetterConfig = {},
    ) =>
      createPropGetter(
        !!disabledProps || disabled,
        (evt) => callAll(onClick, skipFirst(setDPOffset(dpState)))(evt, $date),
        {
          ...rest,
          tabIndex: active ? 0 : -1,
        },
        selected,
      ),
    [dpState],
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
