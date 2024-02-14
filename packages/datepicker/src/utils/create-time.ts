import type { DPConfig, DPTime } from '../types';
import {
  formatLocaleTime,
  formatTime,
  getDateParts,
  getTimeDate,
  newDate,
} from './date';
import { isSame, maxDateAndAfter, minDateAndBefore } from './predicates';

export var createTime = (
  d: Date | undefined,
  { time, locale }: DPConfig,
): DPTime[] => {
  const NOW = newDate();
  const { interval, minTime, maxTime, useLocales } = time;
  const { Y, M, D } = getDateParts(d || NOW);
  // 1440 is a number of minutes in the day 60 * 24
  const segments = 1440 / interval;

  const minDate = getTimeDate(Y, M, D, minTime);
  const maxDate = getTimeDate(Y, M, D, maxTime);

  return Array(segments)
    .fill(0)
    .map((_, i) => {
      const $date = newDate(Y, M, D, 0, i * interval);
      const disabled =
        !d ||
        minDateAndBefore(minDate, $date) ||
        maxDateAndAfter(maxDate, $date);

      return {
        $date,
        disabled,
        now: isSame($date, NOW),
        selected: d ? isSame(d, $date) : false,
        time: useLocales
          ? formatLocaleTime($date, locale)
          : formatTime($date, locale),
      };
    });
};
