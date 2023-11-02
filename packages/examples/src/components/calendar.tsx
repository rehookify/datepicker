import clsx from 'clsx';
import React, { FC, HTMLAttributes } from 'react';

export const Calendar: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => <div className={clsx('calendar', className)} {...props} />;
