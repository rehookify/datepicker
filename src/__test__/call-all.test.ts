import { describe, expect, test, jest } from '@jest/globals';
import { callAll, skipFirst, skipAll } from '../utils/call-all';

describe('callAll', () => {
  test('callAll calls all functions', () => {
    const fn1 = jest.fn();
    const fn2 = jest.fn();

    callAll(fn1, fn2)(1, 2);

    expect(fn1).toHaveBeenCalled();
    expect(fn1).toHaveBeenCalledWith(1, 2);
    expect(fn2).toHaveBeenCalled();
    expect(fn1).toHaveBeenCalledWith(1, 2);
  });
});

describe('skipFirst', () => {
  test('skipFirst calls function with second argument', () => {
    const fn1 = jest.fn();
    const fn2 = jest.fn();

    callAll(fn1, skipFirst(fn2))(1, 2);

    expect(fn1).toHaveBeenCalled();
    expect(fn1).toHaveBeenCalledWith(1, 2);
    expect(fn2).toHaveBeenCalled();
    expect(fn2).toHaveBeenCalledWith(2);
  });
});

describe('skipAll', () => {
  test('skipAll calls function without arguments', () => {
    const fn1 = jest.fn();
    const fn2 = jest.fn();

    callAll(fn1, skipAll(fn2))(1, 2);

    expect(fn1).toHaveBeenCalled();
    expect(fn1).toHaveBeenCalledWith(1, 2);
    expect(fn2).toHaveBeenCalled();
    expect(fn2).toHaveBeenCalledWith();
  });
});
