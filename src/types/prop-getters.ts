import { MouseEvent } from 'react';

export interface DPPropsGetterConfig extends Record<string, unknown> {
  onClick?(evt?: MouseEvent<HTMLElement>, date?: Date): void;
  disabled?: boolean;
}

export interface DPMonthsPropGettersConfig extends DPPropsGetterConfig {
  step?: number;
}

export interface DPPropGetter extends Record<string, unknown> {
  role: 'button';
  tabIndex: number;
  disabled?: boolean;
  'aria-disabled'?: boolean;
  onClick?(evt: MouseEvent<HTMLElement>): void;
}
