import { useCallback } from 'react';

import { setFocus, setRangeEnd as setRangeEndAction } from './state-reducer';
import type {
  DPDay,
  DPPropsGetterConfig,
  DPUseDays,
  DPUseDaysPropGetters,
} from './types';
import { callAll, skipFirst } from './utils/call-all';
import { isRange } from './utils/config';
import { createPropGetter } from './utils/create-prop-getter';
import { formatDate, getCleanDate } from './utils/date';
import { getMultipleDates } from './utils/get-multiple-dates';
import { includeDate, isSame } from './utils/predicates';

export const useDays: DPUseDays = ({ selectedDates, config: { locale } }) => ({
  selectedDates,
  formattedDates: selectedDates.map((d: Date) => formatDate(d, locale)),
});

export const useDaysPropGetters: DPUseDaysPropGetters = ({
  config,
  selectedDates,
  dispatch,
}) => {
  const {
    onDatesChange,
    dates: { mode, toggle, selectSameDate },
  } = config;

  const dayButton = useCallback(
    (
      { $date, selected, disabled }: DPDay,
      { onClick, disabled: disabledProps, ...rest }: DPPropsGetterConfig = {},
    ) =>
      createPropGetter(
        disabled || !!disabledProps,
        (evt) => {
          if (selected && !toggle) {
            selectedDates.forEach((d) => {
              if (isSame(getCleanDate(d), $date)) setFocus(dispatch, d);
            });

            // Handle case when user could select same date in range mode
            if (!isRange(mode) || !selectSameDate) return;
          }
          if (isRange(mode) && selectedDates.length === 1) {
            setRangeEndAction(dispatch, null);
          }
          callAll(
            onClick,
            skipFirst((d: Date) => {
              if (onDatesChange && typeof onDatesChange === 'function') {
                const nextSelectedDates = getMultipleDates(
                  selectedDates,
                  d,
                  config.dates,
                );
                setFocus(
                  dispatch,
                  includeDate(nextSelectedDates, d) ? d : null,
                );
                onDatesChange(nextSelectedDates);
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
        selected,
      ),
    [
      mode,
      toggle,
      config.dates,
      onDatesChange,
      selectedDates,
      dispatch,
      selectSameDate,
    ],
  );

  return { dayButton };
};
