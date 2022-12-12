import React, { FC, PropsWithChildren } from 'react';

export const Container: FC<PropsWithChildren> = ({ children }) => (
  <div className="container">{children}</div>
);
