export interface DPYear {
  $date: Date;
  active: boolean;
  disabled: boolean;
  now: boolean;
  selected: boolean;
  year: number;
}

export type DPYearsMode = 'decade' | 'fluid' | 'exact';
