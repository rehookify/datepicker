import { useCallback } from 'react';
import { setRangeEnd as setRangeEndAction } from './state-reducer';
import { CalendarDay, DPState, PropsGetterConfig } from './types';
import { callAll, skipFirst } from './utils/call-all';
import { isRange } from './utils/config';
import { createPropGetter } from './utils/create-prop-getter';
import { formatDate } from './utils/date';
import { getMultipleDates } from './utils/get-multiple-dates';

export const useDays = ({
  selectedDates,
  state: {
    config: { locale },
  },
}: DPState) => ({
  selectedDates,
  formattedDates: selectedDates.map((d: Date) => formatDate(d, locale)),
});

export const useDaysPropGetters = ({
  selectedDates,
  state: { config },
  dispatch,
}: DPState) => {
  const {
    onDatesChange,
    dates: { mode, toggle },
  } = config;

  const dayButton = useCallback(
    (
      { $date, selected, disabled }: CalendarDay,
      { onClick, disabled: disabledProps, ...rest }: PropsGetterConfig = {},
    ) =>
      createPropGetter(
        disabled || !!disabledProps,
        (evt) => {
          if (selected && !toggle && !isRange(mode)) return;
          if (isRange(mode) && selectedDates.length === 1)
            setRangeEndAction(dispatch, null);
          callAll(
            onClick,
            skipFirst((d: Date) => {
              if (onDatesChange && typeof onDatesChange === 'function') {
                onDatesChange(getMultipleDates(selectedDates, d, config.dates));
              }
            }),
          )(evt, $date);
        },
        {
          ...rest,
          ...(isRange(mode) &&
            selectedDates.length === 1 && {
              onMouseEnter() {
                setRangeEndAction(dispatch, $date);
              },
            }),
        },
      ),
    [mode, toggle, config.dates, onDatesChange, selectedDates, dispatch],
  );

  return { dayButton };
};
