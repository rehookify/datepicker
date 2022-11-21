import { describe, expect, test } from '@jest/globals';
import { ensureArray } from '../utils/ensure-type';

describe('ensureArray', () => {
  test('ensureArray always returns array', () => {
    const testDate = new Date(2022, 10, 20);
    expect(ensureArray(null)).toEqual([]);
    expect(ensureArray([testDate])).toEqual([testDate]);
    expect(ensureArray(testDate)).toEqual([testDate]);
  });
});
