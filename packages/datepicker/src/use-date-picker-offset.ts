import { useCallback } from 'react';

import {
  DPOffsetValue,
  DPPropsGetterConfig,
  DPUseDatePickerOffsetPropGetters,
} from './types';
import { callAll, skipFirst } from './utils/call-all';
import { createPropGetter } from './utils/create-prop-getter';
import {
  getEdgedOffsetDate,
  getNextOffsetDate,
  setDPOffset,
} from './utils/offset';
import { maxDateAndAfter, minDateAndBefore } from './utils/predicates';

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
        const offsetDate = getEdgedOffsetDate(
          state.offsetDate,
          offsetValue,
          maxDate,
        );
        const nextDate = getNextOffsetDate(offsetDate, offsetValue);

        const isDisabled = !!disabled || maxDateAndAfter(maxDate, nextDate);

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

        const offsetDate = getEdgedOffsetDate(
          state.offsetDate,
          negativeOffsetValue,
          minDate,
        );
        const nextDate = getNextOffsetDate(offsetDate, negativeOffsetValue);

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
