import clsx from 'clsx';
import React, { FC, PropsWithChildren } from 'react';

interface HeaderButtonProps {
  className?: string;
}

export const HeaderButton: FC<PropsWithChildren<HeaderButtonProps>> = ({
  children,
  className,
  ...props
}) => {
  const buttonClassName = clsx('calendar-header__button', className);
  return (
    <button className={buttonClassName} {...props}>
      {children}
    </button>
  );
};
