import { describe, expect, test } from '@jest/globals';
import {
  getStartDecadePosition,
  getCenteredYearPosition,
} from '../utils/get-current-year-position';

describe('getStartDecadePosition', () => {
  test('getStartDecadePosition should return year before current decade', () => {
    expect(getStartDecadePosition(2022)).toBe(2019);
  });
});

describe('getStartDecadePosition', () => {
  test('getStartDecadePosition should return centered position', () => {
    expect(getCenteredYearPosition(12, 2022)).toBe(2017);
  });
});
