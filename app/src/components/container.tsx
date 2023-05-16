import clsx from 'clsx';
import React, { FC, HTMLAttributes } from 'react';

export const Container: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => <div className={clsx('container', className)} {...props} />;
