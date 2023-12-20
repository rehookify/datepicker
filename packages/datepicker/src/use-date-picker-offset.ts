import { useCallback } from 'react';

import {
  DPOffsetValue,
  DPPropsGetterConfig,
  DPUseDatePickerOffsetPropGetters,
} from './types';
import { callAll, skipFirst } from './utils/call-all';
import { createPropGetter } from './utils/create-prop-getter';
import { getNextOffsetDate, setDPOffset } from './utils/offset';
import {
  isAfterMaxMonth,
  maxDateAndAfter,
  minDateAndBefore,
} from './utils/predicates';

export const useDatePickerOffsetPropGetters: DPUseDatePickerOffsetPropGetters =
  (state) => {
    const {
      config: { dates },
    } = state;
    const { minDate, maxDate } = dates;

    const addOffset = useCallback(
      (
        offsetValue: DPOffsetValue,
        { disabled, onClick, ...rest }: DPPropsGetterConfig = {},
      ) => {
        const nextDate = getNextOffsetDate(state.offsetDate, offsetValue);
        const disabledDueToMaxDateAndMonthOffset =
          !!offsetValue.months &&
          maxDateAndAfter(maxDate, nextDate) &&
          isAfterMaxMonth(nextDate.getMonth(), maxDate);

        const isDisabled = !!disabled || disabledDueToMaxDateAndMonthOffset;

        return createPropGetter(
          isDisabled,
          (evt) =>
            callAll(onClick, skipFirst(setDPOffset(state)))(evt, nextDate),
          rest,
        );
      },
      [maxDate, state],
    );

    const subtractOffset = useCallback(
      (
        { days = 0, months = 0, years = 0 }: DPOffsetValue,
        { disabled, onClick, ...rest }: DPPropsGetterConfig = {},
      ) => {
        const negativeOffsetValue = {
          days: -days,
          months: -months,
          years: -years,
        };

        const nextDate = getNextOffsetDate(
          state.offsetDate,
          negativeOffsetValue,
        );

        const isDisabled = !!disabled || minDateAndBefore(minDate, nextDate);

        return createPropGetter(
          isDisabled,
          (evt) =>
            callAll(onClick, skipFirst(setDPOffset(state)))(evt, nextDate),
          rest,
        );
      },
      [minDate, state],
    );

    const setOffset = useCallback(
      (d: Date, { disabled, onClick, ...rest }: DPPropsGetterConfig = {}) => {
        const isDisabled =
          !!disabled ||
          minDateAndBefore(minDate, d) ||
          maxDateAndAfter(maxDate, d);

        return createPropGetter(
          isDisabled,
          (evt) => callAll(onClick, skipFirst(setDPOffset(state)))(evt, d),
          rest,
        );
      },
      [state, maxDate, minDate],
    );

    return {
      addOffset,
      setOffset,
      subtractOffset,
    };
  };
