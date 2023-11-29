import type {
  DPCalendarConfig,
  DPConfig,
  DPDatesConfig,
  DPDatesMode,
  DPLocaleConfig,
  DPTimeConfig,
  DPUserConfig,
  DPYearsConfig,
} from '../types';
import { getCleanDate, sortDatesAsc, sortMinMax } from './date';
import { includeDate } from './predicates';

var DEFAULT_CALENDAR_CONFIG: DPCalendarConfig = {
  mode: 'static',
  offsets: [0],
  startDay: 0,
};

var DEFAULT_YEARS_CONFIG: DPYearsConfig = {
  mode: 'decade',
  /*
   * The default value for the numberOfYears is 12
   * it consists of 10 years + 1 year before + 1 year after
   */
  numberOfYears: 12,
  step: 10,
};

var DEFAULT_DATES_CONFIG: Pick<
  DPDatesConfig,
  'mode' | 'toggle' | 'selectSameDate'
> = {
  mode: 'single',
  toggle: false,
  selectSameDate: false,
};

var DEFAULT_TIME_CONFIG: Pick<DPTimeConfig, 'interval' | 'useLocales'> = {
  interval: 30,
  useLocales: false,
};

var DEFAULT_LOCALE_CONFIG: DPLocaleConfig = {
  locale: 'en-GB',
  day: '2-digit',
  year: 'numeric',
  weekday: 'short',
  monthName: 'long',
  hour: '2-digit',
  minute: '2-digit',
  hour12: undefined,
  second: undefined,
};

export function createConfig({
  selectedDates = [],
  onDatesChange,
  focusDate,
  offsetDate,
  onOffsetChange,
  calendar = {},
  dates = {},
  locale,
  time = {},
  exclude = {},
  years,
}: DPUserConfig): DPConfig {
  const { minDate, maxDate, ...restDates } = dates;
  const { offsets = [], ...restCalendarParams } = calendar;
  const { minTime, maxTime, ...restTime } = time;

  const [minD, maxD] = sortMinMax(minDate, maxDate, sortDatesAsc);
  const [minT, maxT] = sortMinMax(minTime, maxTime, (a, b) => a.h - b.h);

  const focus =
    focusDate && includeDate(selectedDates, focusDate) ? focusDate : undefined;

  return {
    selectedDates,
    onDatesChange,
    offsetDate,
    onOffsetChange,
    focusDate: focus,
    calendar: {
      ...DEFAULT_CALENDAR_CONFIG,
      ...restCalendarParams,
      offsets: DEFAULT_CALENDAR_CONFIG.offsets.concat(offsets),
    },
    years: { ...DEFAULT_YEARS_CONFIG, ...years },
    dates: {
      ...DEFAULT_DATES_CONFIG,
      ...restDates,
      minDate: minD && getCleanDate(minD),
      maxDate: maxD && getCleanDate(maxD),
    },
    locale: {
      ...DEFAULT_LOCALE_CONFIG,
      ...locale,
    },
    time: {
      ...DEFAULT_TIME_CONFIG,
      minTime: minT,
      maxTime: maxT,
      ...restTime,
    },
    exclude,
  };
}

export function isRange(mode: DPDatesMode): boolean {
  return mode === 'range';
}
