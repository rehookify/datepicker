import { describe, test, expect } from '@jest/globals';
import { createConfig } from '../utils/create-config';
import { createMonths } from '../utils/create-months';
import { TEST_MONTHS } from '../__mock__/months';

describe('createMonth', () => {
  test('createMonth should generate months correctly', () => {
    const { locale } = createConfig();
    const months = createMonths(new Date(2022, 10, 20), [], locale);

    expect(months).toEqual(TEST_MONTHS);
  });
});
