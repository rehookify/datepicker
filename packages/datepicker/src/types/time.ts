export interface DPTimeLimit {
  h: number;
  m: number;
}

export interface DPTime {
  $date: Date;
  disabled: boolean;
  now: boolean;
  selected: boolean;
  time: string;
}
