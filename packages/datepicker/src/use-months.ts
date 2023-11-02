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
      { $date, disabled, selected }: DPMonth,
      { onClick, disabled: disabledProps, ...rest }: DPPropsGetterConfig = {},
    ) =>
      createPropGetter(
        !!disabledProps || disabled,
        (evt) => callAll(onClick, skipFirst(setDPOffset(dpState)))(evt, $date),
        rest,
        selected,
      ),
    [dpState],
  );

  return { monthButton };
};
