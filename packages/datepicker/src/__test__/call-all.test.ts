import { describe, expect, test, vi } from 'vitest';

import { callAll, skipAll, skipFirst } from '../utils/call-all';

describe('callAll', () => {
  test('callAll calls all functions', () => {
    const fn1 = vi.fn();
    const fn2 = vi.fn();

    callAll(fn1, fn2)(1, 2);

    expect(fn1).toHaveBeenCalled();
    expect(fn1).toHaveBeenCalledWith(1, 2);
    expect(fn2).toHaveBeenCalled();
    expect(fn1).toHaveBeenCalledWith(1, 2);
  });
});

describe('skipFirst', () => {
  test('skipFirst calls function with second argument', () => {
    const fn1 = vi.fn();
    const fn2 = vi.fn();

    callAll(fn1, skipFirst(fn2))(1, 2);

    expect(fn1).toHaveBeenCalled();
    expect(fn1).toHaveBeenCalledWith(1, 2);
    expect(fn2).toHaveBeenCalled();
    expect(fn2).toHaveBeenCalledWith(2);
  });
});

describe('skipAll', () => {
  test('skipAll calls function without arguments', () => {
    const fn1 = vi.fn();
    const fn2 = vi.fn();

    callAll(fn1, skipAll(fn2))(1, 2);

    expect(fn1).toHaveBeenCalled();
    expect(fn1).toHaveBeenCalledWith(1, 2);
    expect(fn2).toHaveBeenCalled();
    expect(fn2).toHaveBeenCalledWith();
  });
});
