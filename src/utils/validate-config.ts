import { DatePickerConfig } from '../types';
import { toLocaleDateString } from './date';
import { isAfter, isBefore } from './predicates';

export const validateConfig = ({ dates }: DatePickerConfig) => {
  const { selectedDates, minDate, maxDate } = dates || {};
  if (selectedDates && selectedDates.length > 0) {
    if (minDate && selectedDates.every((date) => isBefore(date, minDate))) {
      throw new Error(
        `All selectedDates must be after minDate: ${toLocaleDateString(
          minDate,
        )}`,
      );
    }

    if (maxDate && selectedDates.every((date) => isAfter(date, maxDate))) {
      throw new Error(
        `All selectedDates must be before maxDate: ${toLocaleDateString(
          maxDate,
        )}`,
      );
    }
  }

  if (minDate && maxDate) {
    if (isBefore(maxDate, minDate)) {
      throw new Error(
        `maxDate: ${toLocaleDateString(
          maxDate,
        )} < minDate: ${toLocaleDateString(minDate)}`,
      );
    }
  }
};
