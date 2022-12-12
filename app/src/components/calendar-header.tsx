import React, { FC, PropsWithChildren, ReactNode } from 'react';

interface CalendarHeaderProps {
  leftButton?: ReactNode;
  rightButton?: ReactNode;
}

export const CalendarHeader: FC<PropsWithChildren<CalendarHeaderProps>> = ({
  leftButton,
  children,
  rightButton,
}) => {
  return (
    <header className="calendar-header">
      {leftButton}
      {children}
      {rightButton}
    </header>
  );
};
