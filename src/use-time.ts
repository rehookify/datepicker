import { useCallback } from 'react';
import { setFocus } from './state-reducer';
import { DPState, PropsGetterConfig, Time } from './types';
import { callAll, skipFirst } from './utils/call-all';
import { createPropGetter } from './utils/create-prop-getter';
import { createTime } from './utils/create-time';
import { isSame } from './utils/predicates';

export const useTime = ({ state: { config, focusDate } }: DPState) => ({
  time: createTime(focusDate, config),
});

export const useTimePropGetter = ({
  selectedDates,
  state: { config, focusDate },
  dispatch,
}: DPState) => {
  const { onDatesChange } = config;
  const timeButton = useCallback(
    (
      { $date, selected, disabled }: Time,
      { onClick, disabled: disabledProps, ...rest }: PropsGetterConfig = {},
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
