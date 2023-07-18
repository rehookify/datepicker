import { DatePickerStateProvider } from '@rehookify/datepicker';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

export const ModularContextProvider = () => {
  const [selectedDates, onDatesChange] = useState<Date[]>([]);

  return (
    <DatePickerStateProvider
      config={{
        selectedDates,
        onDatesChange,
        dates: {
          mode: 'multiple',
        },
        calendar: {
          startDay: 1,
          // mode: 'fluid',
        },
        exclude: {
          // day: [0, 6],
          // date: [new Date(2023, 2, 8)],
        },
      }}
    >
      <Outlet />
    </DatePickerStateProvider>
  );
};
