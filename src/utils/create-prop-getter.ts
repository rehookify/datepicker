import { MouseEvent } from 'react';

import type { DPPropGetter, DPPropsGetterConfig } from '../types';

export const createPropGetter = (
  isDisabled: boolean,
  action: (evt: MouseEvent<HTMLElement>) => void,
  props: DPPropsGetterConfig = {},
): DPPropGetter => ({
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
