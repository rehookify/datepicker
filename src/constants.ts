import dayjs, { Dayjs } from 'dayjs';
import { CalendarMonth } from './types';

/*
 * It is used for static 🗓 to cover all possible month start and end date combination
 * One month could take 6 rows by 7 days
 * 27 28 29 30 31 01 02
 * 03 04 05 06 07 08 09
 * 10 11 12 13 14 15 16
 * 17 18 19 20 21 22 23
 * 24 25 26 27 28 29 30
 * 31 01 02 03 04 05 06
 */
const NUMBER_OF_DAYS = 42;

export const DAYS_ARRAY: number[] = Array(NUMBER_OF_DAYS).fill(1);

// Nice to have it statically :)
export const NOW: Dayjs = dayjs();

// @TODO generate it using dayjs localization and format from config
// [Mon, Tue, Wed, Thu, Fri, Sat, Sun]
export const DAYS_NAMES: string[] = Array(7)
  .fill(1)
  .map((el, index) => NOW.day(el + index).format('ddd'));

// @TODO generate it using dayjs localization and format from config
// Indexes in dayjs starts from 0
// [{ name: 'January', index: 0 }, { name: 'February', index: 1 }, ...]
export const MONTHS_NAMES: CalendarMonth[] = Array(12)
  .fill(0)
  .map((_, index) => ({
    name: NOW.month(index).format('MMMM'),
    index,
  }));
