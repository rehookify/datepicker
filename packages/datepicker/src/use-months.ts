import { useCallback, useMemo } from 'react';

import type {
  DPMonth,
  DPPropsGetterConfig,
  DPUseMonths,
  DPUseMonthsPropGetters,
} from './types';
import { callAll, skipFirst } from './utils/call-all';
import { createMonths } from './utils/create-months';
import { createPropGetter } from './utils/create-prop-getter';
import { setDPOffset } from './utils/offset';

export const useMonths: DPUseMonths = ({
  selectedDates,
  offsetDate,
  config: { locale, dates },
}) =>
  useMemo(
    () => ({
      months: createMonths(offsetDate, selectedDates, locale, dates),
    }),
    [dates, locale, offsetDate, selectedDates],
  );

export const useMonthsPropGetters: DPUseMonthsPropGetters = (dpState) => {
  const monthButton = useCallback(
    (
      { $date, disabled, selected, active }: DPMonth,
      {
        onClick,
        onPress,
        disabled: disabledProps,
        ...rest
      }: DPPropsGetterConfig = {},
    ) =>
      createPropGetter(
        !!disabledProps || disabled,
        (evt) =>
          callAll(onClick || onPress, skipFirst(setDPOffset(dpState)))(
            evt,
            $date,
          ),
        {
          ...rest,
          tabIndex: active ? 0 : -1,
        },
        selected,
      ),
    [dpState],
  );

  return { monthButton };
};
