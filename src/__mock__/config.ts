export const DEFAULT_CONFIG = {
  selectedDates: [],
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
    minDate: null,
    maxDate: null,
    selectSameDate: false,
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
  time: {
    interval: 30,
    minTime: null,
    maxTime: null,
  },
};
