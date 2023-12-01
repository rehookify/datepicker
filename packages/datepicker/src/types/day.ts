// The days in JS Date object has numbers from 0 - Sun to 6 - Sat
export type DPDayInteger = 0 | 1 | 2 | 3 | 4 | 5 | 6;

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
  active: boolean;
  day: string;
  disabled: boolean;
  inCurrentMonth: boolean;
  now: boolean;
  range: DPDayRange;
  selected: boolean;
}
