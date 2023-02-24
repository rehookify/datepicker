import { DPDayInteger } from './date';
import { DPMonthInteger } from './month';

type DPExcludedDate =
  | Date
  | { date: Date; repeat?: boolean }
  | { from: Date; to: Date };
export interface DPExcludeConfiguration {
  day?: DPDayInteger[];
  date?: DPExcludedDate[];
  month?: DPMonthInteger[];
  monthDate?: Date[];
  year?: number[];
}
