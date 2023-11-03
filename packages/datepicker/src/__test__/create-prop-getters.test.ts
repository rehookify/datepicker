import { describe, expect, test, vi } from 'vitest';

import { createPropGetter } from '../utils/create-prop-getter';

describe('createPropGetter', () => {
  test('createPropGetter should create correct not disabled config', () => {
    const { role, tabIndex, onClick } = createPropGetter(false, vi.fn(), {});

    expect(role).toBe('button');
    expect(tabIndex).toBe(0);
    expect(onClick).toBeTruthy();
  });

  test('createPropGetter should create correct disabled config', () => {
    const {
      role,
      tabIndex,
      onClick,
      disabled,
      'aria-disabled': ariaDisabled,
      'aria-selected': ariaSelected,
    } = createPropGetter(true, vi.fn(), {}, true);

    expect(role).toBe('button');
    expect(tabIndex).toBe(0);
    expect(onClick).toBeFalsy();
    expect(disabled).toBe(true);
    expect(ariaDisabled).toBe(true);
    expect(ariaSelected).toBe(true);
  });
});
