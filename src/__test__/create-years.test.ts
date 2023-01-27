import { describe, test, expect } from '@jest/globals';
import { createConfig } from '../utils/config';
import { createYears } from '../utils/create-years';
import { getDateParts } from '../utils/date';
import { getStartDecadePosition } from '../utils/get-current-year-position';
// import { TEST_YEARS } from '../__mock__/years';

describe('createYears', () => {
  test('createYears should create years correctly', () => {
    const { years: yearsConfig, dates } = createConfig();
    const NOW = new Date();
    const { Y, M, D } = getDateParts(NOW);

    // Years with default config and without selection
    let years = createYears(
      getStartDecadePosition(Y),
      NOW,
      [],
      yearsConfig,
      dates,
    );

    let now = years.filter(({ now }) => now);
    const active = years.filter(({ active }) => active);
    let selected = years.filter(({ selected }) => selected);

    expect(years.length).toBe(12);
    expect(now.length).toBe(1);
    expect(active.length).toBe(1);
    expect(selected.length).toBe(0);

    years = createYears(
      getStartDecadePosition(Y),
      NOW,
      [NOW, new Date(Y + 1, M, D)],

      yearsConfig,
      dates,
    );

    selected = years.filter(({ selected }) => selected);

    expect(selected.length).toBe(2);

    years = createYears(
      getStartDecadePosition(Y + 20),
      new Date(Y + 20, M, D),
      [],
      yearsConfig,
      dates,
    );

    now = years.filter(({ now }) => now);

    expect(now.length).toBe(0);
  });

  test('createYears should generate correct number of years', () => {
    const { years: yearsConfig, dates } = createConfig({
      years: {
        numberOfYears: 50,
      },
    });

    const years = createYears(
      getStartDecadePosition(2022),
      new Date(2022, 10, 20),
      [],
      yearsConfig,
      dates,
    );

    expect(years.length).toBe(50);
  });
});
