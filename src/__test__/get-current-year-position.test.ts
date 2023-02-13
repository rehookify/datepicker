import { describe, expect, test } from '@jest/globals';

import {
  getFluidYearPosition,
  getStartDecadePosition,
} from '../utils/get-current-year-position';

describe('getStartDecadePosition', () => {
  test('getStartDecadePosition should return year before current decade', () => {
    expect(getStartDecadePosition(2022)).toBe(2019);
  });
});

describe('getStartDecadePosition', () => {
  test('getStartDecadePosition should return centered position', () => {
    expect(getFluidYearPosition(2022, 12)).toBe(2017);
  });
});
