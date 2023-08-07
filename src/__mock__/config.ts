import { vi } from 'vitest';

export const DEFAULT_CONFIG = {
  selectedDates: [],
  onDatesChange: vi.fn,
  focusDate: undefined,
  calendar: {
    mode: 'static',
    offsets: [0],
    startDay: 0,
  },
  years: {
    mode: 'decade',
    numberOfYears: 12,
    step: 10,
  },
  dates: {
    mode: 'single',
    toggle: false,
    selectSameDate: false,
    minDate: undefined,
    maxDate: undefined,
  },
  locale: {
    day: '2-digit',
    hour: '2-digit',
    hour12: undefined,
    locale: 'en-GB',
    minute: '2-digit',
    monthName: 'long',
    second: undefined,
    weekday: 'short',
    year: 'numeric',
  },
  exclude: {},
  time: {
    interval: 30,
    useLocales: false,
  },
};
