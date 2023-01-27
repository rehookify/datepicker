import { describe, test, expect } from '@jest/globals';
import { createConfig } from '../utils/config';
import { createMonths } from '../utils/create-months';
import { getCleanDate, getDateParts } from '../utils/date';

describe('createMonth', () => {
  test('createMonth should generate months correctly', () => {
    const { locale, dates } = createConfig();

    // Default configuration with no selected dates
    const NOW = getCleanDate(new Date());
    const { Y, M, D } = getDateParts(NOW);

    let months = createMonths(NOW, [], locale, dates);

    const active = months.filter(({ active }) => active);
    let now = months.filter(({ now }) => now);

    // we will always have 1 active month
    expect(active.length).toBe(1);
    expect(now.length).toBe(1);

    // with 2 selected dates
    months = createMonths(NOW, [NOW, new Date(Y, M + 1, D)], locale, dates);

    let selected = months.filter(({ selected }) => selected);

    expect(selected.length).toBe(2);

    // with 2 selection and offset date in the future
    months = createMonths(
      new Date(Y + 1, M, D),
      [NOW, new Date(Y, M, D + 5)],
      locale,
      dates,
    );

    now = months.filter(({ now }) => now);
    selected = months.filter(({ selected }) => selected);

    expect(now.length).toBe(0);
    expect(selected.length).toBe(0);
  });
});
