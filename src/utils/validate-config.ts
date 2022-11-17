import { DatePickerConfig } from '../types';
import { isAfter, isBefore } from './date';

export const validateConfig = ({ dates }: DatePickerConfig) => {
  const { selectedDates, minDate, maxDate } = dates || {};
  if (selectedDates && selectedDates.length > 0) {
    if (minDate && selectedDates.every((date) => isBefore(date, minDate))) {
      throw new Error(
        `All selectedDates must be after minDate: ${minDate.toLocaleDateString()}`,
      );
    }

    if (maxDate && selectedDates.every((date) => isAfter(date, maxDate))) {
      throw new Error(
        `All selectedDates must be before maxDate: ${maxDate.toLocaleDateString()}`,
      );
    }
  }

  if (minDate && maxDate) {
    if (isBefore(maxDate, minDate)) {
      throw new Error(
        `maxDate ${maxDate.toLocaleDateString()} is before minDate ${minDate.toLocaleDateString()}`,
      );
    }
  }
};
