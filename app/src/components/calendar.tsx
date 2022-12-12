import React, { FC, PropsWithChildren } from 'react';

export const Calendar: FC<PropsWithChildren> = ({ children }) => (
  <div className="calendar">{children}</div>
);
