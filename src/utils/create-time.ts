import { MINUTES_IN_THE_DAY } from '../constants';
import { DatePickerConfig } from '../types';
import { getDateParts } from './date';

export const createTime = (
  d: Date | null,
  { time, locale }: DatePickerConfig,
) => {
  const { interval } = time;
  const { Y, M, D } = getDateParts(d || new Date());
  const segments = MINUTES_IN_THE_DAY / interval;

  const t = [];
  console.log('FOCUS DATE INSIDE CREATE TIME: ', d);

  for (let i = 0; i < segments; i++) {
    const timeDate = new Date(Y, M, D, 0, i * interval);
    t.push({
      $date: timeDate,
      time: timeDate.toLocaleTimeString(locale.locale, {
        hour: locale.hour,
        minute: locale.minute,
        second: locale.second,
        hour12: locale.hour12,
      }),
      selected: false,
      disabled: !d,
    });
  }

  console.log(t);

  return t;
};

/*
{
  $date: Date,
  time: string,
  selected: boolean,
  disabled: boolean,
}
*/
