import { useCallback } from 'react';

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

export const useTime: DPUseTime = ({ state: { config, focusDate } }) => ({
  time: createTime(focusDate, config),
});

export const useTimePropGetter: DPUseTimePropGetter = ({
  selectedDates,
  state: { config, focusDate },
  dispatch,
}) => {
  const { onDatesChange } = config;
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
              if (onDatesChange && typeof onDatesChange === 'function') {
                const newSelected = selectedDates.map((selected) => {
                  return isSame(focusDate as Date, selected) ? d : selected;
                });
                setFocus(dispatch, d);
                onDatesChange(newSelected);
              }
            }),
          )(evt, $date);
        },
        rest,
      ),
    [selectedDates, onDatesChange, dispatch, focusDate],
  );

  return { timeButton };
};
