import { MouseEvent } from 'react';

export interface DPPropsGetterConfig extends Record<string, unknown> {
  onClick?(evt?: MouseEvent<HTMLElement>, date?: Date): void;
  onPress?(evt?: any, date?: Date): void;
  disabled?: boolean;
}

export interface DPPropGetter extends Record<string, unknown> {
  role: 'button';
  tabIndex: number;
  disabled?: boolean;
  'aria-disabled'?: boolean;
  'aria-selected'?: boolean;
  onClick?(evt: MouseEvent<HTMLElement>): void;
  onPress?(evt: any): void;
}
