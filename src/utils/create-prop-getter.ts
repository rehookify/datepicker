import { MouseEvent } from 'react';
import { PropsGetterConfig } from '../types';

export const createPropGetter = (
  isDisabled: boolean,
  action: (evt: MouseEvent<HTMLElement>) => void,
  props: PropsGetterConfig = {},
) => ({
  role: 'button',
  tabIndex: 0,
  ...(isDisabled && {
    disabled: true,
    'aria-disabled': true,
  }),
  ...(!isDisabled && {
    onClick(evt: MouseEvent<HTMLElement>) {
      action(evt);
    },
  }),
  ...props,
});
