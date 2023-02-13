import { describe, expect, jest, test } from '@jest/globals';

import { createPropGetter } from '../utils/create-prop-getter';

describe('createPropGetter', () => {
  test('createPropGetter should create correct not disabled config', () => {
    const { role, tabIndex, onClick } = createPropGetter(false, jest.fn(), {});

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
    } = createPropGetter(true, jest.fn(), {});

    expect(role).toBe('button');
    expect(tabIndex).toBe(0);
    expect(onClick).toBeFalsy();
    expect(disabled).toBe(true);
    expect(ariaDisabled).toBe(true);
  });
});
