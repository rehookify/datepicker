// JS Date has months number from 0 - January to 11 - December
export type DPMonthInteger = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export interface DPMonth {
  $date: Date;
  active: boolean;
  disabled: boolean;
  month: string;
  now: boolean;
  selected: boolean;
}
