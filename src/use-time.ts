import { useCallback, useMemo } from 'react';

import { setFocus } from './state-reducer';
import type {
  DPPropsGetterConfig,
  DPTime,
  DPUseTime,
  DPUseTimePropGetter,
} from './types';
import { callAll, skipFirst } from './utils/call-all';
import { createPropGetter } from './utils/create-prop-getter';
import { createTime } from './utils/create-time';
import { isSame } from './utils/predicates';

export const useTime: DPUseTime = ({ state: { focusDate }, config }) =>
  useMemo(
    () => ({
      time: createTime(focusDate, config),
    }),
    [focusDate, config],
  );

export const useTimePropGetter: DPUseTimePropGetter = ({
  selectedDates,
  state: { focusDate },
  config: { onDatesChange },
  dispatch,
}) => {
  const timeButton = useCallback(
    (
      { $date, selected, disabled }: DPTime,
      { onClick, disabled: disabledProps, ...rest }: DPPropsGetterConfig = {},
    ) =>
      createPropGetter(
        disabled || !!disabledProps,
        (evt) => {
          if (selected) return;
          callAll(
            onClick,
            skipFirst((d: Date) => {
              const newSelected = selectedDates.map((selected) => {
                return isSame(focusDate as Date, selected) ? d : selected;
              });
              setFocus(dispatch, d);
              onDatesChange(newSelected);
            }),
          )(evt, $date);
        },
        rest,
        selected,
      ),
    [selectedDates, onDatesChange, dispatch, focusDate],
  );

  return { timeButton };
};
