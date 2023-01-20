import {
  DatePickerStateProvider,
  DatePickerUserConfig,
} from '@rehookify/datepicker';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

export const ModularContextProvider = () => {
  const [selectedDates, onDatesChange] = useState<Date[]>([]);
  const config: DatePickerUserConfig = {
    selectedDates,
    onDatesChange,
    dates: {
      toggle: true,
      mode: 'multiple',
    },
  };
  return (
    <DatePickerStateProvider config={config}>
      <Outlet />
    </DatePickerStateProvider>
  );
};
