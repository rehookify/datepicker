import { useCallback, useMemo } from 'react';

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
import { isWeb } from './utils/platform';

export const useDays: DPUseDays = ({ selectedDates, config: { locale } }) =>
  useMemo(
    () => ({
      selectedDates,
      formattedDates: selectedDates.map((d: Date) => formatDate(d, locale)),
    }),
    [selectedDates, locale],
  );

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
      { $date, selected, disabled, active }: DPDay,
      {
        onClick,
        onPress,
        disabled: disabledProps,
        ...rest
      }: DPPropsGetterConfig = {},
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
            onClick || onPress,
            skipFirst((d: Date) => {
              const nextSelectedDates = getMultipleDates(
                selectedDates,
                d,
                config.dates,
              );
              setFocus(
                dispatch,
                includeDate(nextSelectedDates, d) ? d : undefined,
              );
              onDatesChange(nextSelectedDates);
            }),
          )(evt, $date);
        },
        {
          ...rest,
          ...(isRange(mode) &&
            selectedDates.length === 1 &&
            isWeb && {
              onMouseEnter() {
                setRangeEndAction(dispatch, $date);
              },
            }),
          tabIndex: active ? 0 : -1,
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
