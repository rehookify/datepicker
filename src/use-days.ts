import { Dispatch, useCallback } from 'react';
import {
  Action,
  selectDates,
  setRangeEnd as setRangeEndAction,
  State,
} from './state-reducer';
import { CalendarDay, PropsGetterConfig } from './types';
import { callAll, skipFirst } from './utils/call-all';
import { createPropGetter } from './utils/create-prop-getter';
import { formatDate } from './utils/date';

export const useDays = ({ selectedDates, config: { locale } }: State) => ({
  selectedDates,
  formattedDates: selectedDates.map((d: Date) => formatDate(d, locale)),
});

export const useDaysPropGetters = (
  { selectedDates, config }: State,
  dispatch: Dispatch<Action>,
) => {
  const {
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
          if (selected && !toggle) return;
          if (mode === 'range' && selectedDates.length === 1)
            setRangeEndAction(dispatch, null);
          callAll(
            onClick,
            skipFirst((d: Date) => selectDates(dispatch, d)),
          )(evt, $date);
        },
        {
          ...rest,
          ...(mode === 'range' &&
            selectedDates.length === 1 && {
              onMouseEnter() {
                setRangeEndAction(dispatch, $date);
              },
            }),
        },
      ),
    [mode, toggle, selectedDates.length, dispatch],
  );

  return { dayButton };
};

export const useDaysActions = (dispatch: Dispatch<Action>) => {
  const setDay = useCallback(
    (d: Date) => {
      selectDates(dispatch, d);
    },
    [dispatch],
  );

  const setRangeEnd = useCallback(
    (d: Date | null) => setRangeEndAction(dispatch, d),
    [dispatch],
  );

  return { setDay, setRangeEnd };
};
