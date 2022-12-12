import {
  DatePickerStateProvider,
  DatePickerUserConfig,
} from '@rehookify/datepicker';
import React from 'react';
import { Outlet } from 'react-router-dom';

export const ModularContextProvider = () => {
  const config: DatePickerUserConfig = {
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
