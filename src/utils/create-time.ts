import { MINUTES_IN_THE_DAY } from '../constants';
import { DatePickerConfig, Time } from '../types';
import { formatTime, getDateParts, getTimeDate } from './date';
import { isSame, maxDateAndAfter, minDateAndBefore } from './predicates';

export const createTime = (
  d: Date | null,
  { time, locale }: DatePickerConfig,
): Time[] => {
  const { interval, minTime, maxTime } = time;
  const { Y, M, D } = getDateParts(d || new Date());
  const segments = MINUTES_IN_THE_DAY / interval;

  const t = [];
  const minDate = getTimeDate(Y, M, D, minTime);
  const maxDate = getTimeDate(Y, M, D, maxTime);
  const now = new Date();

  for (let i = 0; i < segments; i++) {
    const timeDate = new Date(Y, M, D, 0, i * interval);
    const disabled =
      !d ||
      minDateAndBefore(minDate, timeDate) ||
      maxDateAndAfter(maxDate, timeDate);

    t.push({
      $date: timeDate,
      disabled,
      now: isSame(timeDate, now),
      selected: d ? isSame(d, timeDate) : false,
      time: formatTime(timeDate, locale),
    });
  }

  return t;
};
