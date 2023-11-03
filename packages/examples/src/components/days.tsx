import React, { FC, PropsWithChildren } from 'react';

export const Days: FC<PropsWithChildren> = ({ children }) => (
  <div className="days">{children}</div>
);
