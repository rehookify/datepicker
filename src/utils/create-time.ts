import { MINUTES_IN_THE_DAY } from '../constants';
import type { DPConfig, DPTime } from '../types';
import { formatTime, getDateParts, getTimeDate, newDate } from './date';
import { isSame, maxDateAndAfter, minDateAndBefore } from './predicates';

export const createTime = (
  d: Date | null,
  { time, locale }: DPConfig,
): DPTime[] => {
  const NOW = newDate();
  const { interval, minTime, maxTime } = time;
  const { Y, M, D } = getDateParts(d || NOW);
  const segments = MINUTES_IN_THE_DAY / interval;

  const t = [];
  const minDate = getTimeDate(Y, M, D, minTime);
  const maxDate = getTimeDate(Y, M, D, maxTime);

  for (let i = 0; i < segments; i++) {
    const $date = newDate(Y, M, D, 0, i * interval);
    const disabled =
      !d || minDateAndBefore(minDate, $date) || maxDateAndAfter(maxDate, $date);

    t.push({
      $date,
      disabled,
      now: isSame($date, NOW),
      selected: d ? isSame(d, $date) : false,
      time: formatTime($date, locale),
    });
  }

  return t;
};
