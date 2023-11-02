import { WEEK_DAYS } from '../constants';

// The days in JS Date object has numbers from 0 - Sun to 6 - Sat
export type DPDayInteger = (typeof WEEK_DAYS)[number];

export type DPDayRange =
  | 'in-range'
  | 'range-start'
  | 'range-end'
  | 'range-start range-end'
  | 'will-be-in-range'
  | 'will-be-range-start'
  | 'will-be-range-end'
  | '';

export interface DPDay {
  $date: Date;
  day: string;
  disabled: boolean;
  inCurrentMonth: boolean;
  now: boolean;
  range: DPDayRange;
  selected: boolean;
}
