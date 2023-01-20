import { useCallback } from 'react';
import { DPState, PropsGetterConfig, Time } from './types';
import { createPropGetter } from './utils/create-prop-getter';
import { createTime } from './utils/create-time';

export const useTime = ({ state: { config, focusDate } }: DPState) => {
  return { time: createTime(focusDate, config) };
};

export const useTimePropGetter = ({ state: { config } }: DPState) => {
  const timeButton = useCallback(
    (
      { $date, selected, disabled }: Time,
      { onClick, disabled: disabledProps, ...rest }: PropsGetterConfig = {},
    ) => {
      createPropGetter(disabled || !!disabledProps, (evt) => {
        if (selected) return;
        console.log($date);
        console.log(evt);
        console.log(config);
        console.log(rest);
        // if (mode === 'range' && selectedDates.length === 1)
        //   setRangeEndAction(dispatch, null);
        // callAll(
        //   onClick,
        //   skipFirst((d: Date) => {
        //     if (onDatesChange && typeof onDatesChange === 'function') {
        //       onDatesChange(getMultipleDates(selectedDates, d, config.dates));
        //     }
        //   }),
        // )(evt, $date);
      });
    },
    [],
  );

  return { timeButton };
};
