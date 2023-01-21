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
  },
  locale: {
    locale: 'en-GB',
    day: '2-digit',
    year: 'numeric',
    weekday: 'short',
    monthName: 'long',
  },
};
