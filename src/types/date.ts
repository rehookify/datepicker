import { DPDayInteger } from './day';

export type DPDatePart = 'year' | 'month' | 'date';
export interface DPDateParts {
  D: number;
  M: number;
  Y: number;
}

export type DPDatesMode = 'single' | 'multiple' | 'range';

export type DPDateExclude = {
  day?: DPDayInteger[];
  date?: Date[];
};
