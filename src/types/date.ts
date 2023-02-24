export type DatePart = 'year' | 'month' | 'date';

export type DatesMode = 'single' | 'multiple' | 'range';

// The days in JS Date object has numbers from 0 - Sun to 6 - Sat
export type DPDayInteger = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type DPDateExclude = {
  day?: DPDayInteger[];
  date?: Date[];
};

export interface DatesConfig {
  mode: DatesMode;
  minDate?: Date;
  maxDate?: Date;
  toggle: boolean;
  limit?: number;
  selectSameDate: boolean;
  exclude?: DPDateExclude;
}

export interface DatesUserConfig extends Partial<DatesConfig> {
  selectedDates: Date | Date[];
}
