import { describe, test, expect } from '@jest/globals';
import { createConfig } from '../utils/create-config';
import { createYears } from '../utils/create-years';
import { getStartDecadePosition } from '../utils/get-current-year-position';
import { TEST_YEARS } from '../__mock__/years';

describe('createYears', () => {
  test('createYears should create years correctly', () => {
    const { years: yearsConfig } = createConfig();
    const years = createYears(
      getStartDecadePosition(2022),
      new Date(2022, 10, 20),
      [],
      yearsConfig,
    );

    expect(years.length).toBe(12);
    expect(years).toEqual(TEST_YEARS);
  });
});
