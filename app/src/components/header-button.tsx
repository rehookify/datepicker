import React, { FC, PropsWithChildren } from 'react';

export const HeaderButton: FC<PropsWithChildren> = ({ children, ...props }) => {
  return (
    <button className="calendar__header-button" {...props}>
      {children}
    </button>
  );
};
