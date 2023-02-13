import { MouseEvent } from 'react';

import { PropsGetterConfig } from '../types';

interface PropGettersDefault extends Record<string, unknown> {
  role: 'button';
  tabIndex: number;
}

export interface PropGettersDisabled extends PropGettersDefault {
  disabled: boolean;
  'aria-disabled': boolean;
}

export interface PropGettersEnabled extends PropGettersDefault {
  onClick(evt: MouseEvent<HTMLElement>): void;
}

export const createPropGetter = (
  isDisabled: boolean,
  action: (evt: MouseEvent<HTMLElement>) => void,
  props: PropsGetterConfig = {},
): PropGettersDisabled | PropGettersEnabled => ({
  role: 'button',
  tabIndex: 0,
  ...(isDisabled
    ? {
        disabled: true,
        'aria-disabled': true,
      }
    : {
        onClick(evt: MouseEvent<HTMLElement>) {
          action(evt);
        },
      }),
  ...props,
});
