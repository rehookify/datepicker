import React, { FC, PropsWithChildren } from 'react';

export const CalendarHeaderTitle: FC<PropsWithChildren> = ({
  children,
  ...props
}) => (
  <p className="calendar-header__title" {...props}>
    {children}
  </p>
);
