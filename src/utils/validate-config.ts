import { DatePickerConfig } from '../types';

export const validateConfig = ({
  selectedDate,
  minDate,
  maxDate,
}: DatePickerConfig) => {
  if (selectedDate) {
    if (minDate && selectedDate.isBefore(minDate)) {
      throw new Error(
        `selectedDate ${selectedDate.format(
          'DD.MM.YYYY',
        )} date is before minDate ${minDate.format('DD.MM.YYYY')}`,
      );
    }

    if (maxDate && selectedDate.isAfter(maxDate)) {
      throw new Error(
        `selectedDate ${selectedDate.format(
          'DD.MM.YYYY',
        )} date is after maxDate ${maxDate.format('DD.MM.YYYY')}`,
      );
    }
  }

  if (minDate && maxDate) {
    if (maxDate.isBefore(minDate)) {
      throw new Error(
        `maxDate ${maxDate.format(
          'DD.MM.YYYY',
        )} is before minDate ${minDate.format('DD.MM.YYYY')}`,
      );
    }
  }
};
