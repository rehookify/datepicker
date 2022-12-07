import { YearsConfig } from '../types';

/*
 * If number of the year is default = 12 and current year is 2022
 * It will show this matrix
 * 2017 2018 2019
 * 2020 2021 2022 👌
 * 2023 2024 2025
 * 2026 2027 2028
 * I think it is nicer to look at the future more ;)
 */
export const getFluidYearPosition = (
  year: number,
  numberOfYears: number,
): number => year - (numberOfYears / 2 - (numberOfYears % 2 === 0 ? 1 : 0));

/*
 * Default behavior years collection
 * It get start of the decade -1
 * It really comfortable to navigate through years
 * because you have links to the previous and next decade
 * 2019 2020 2021
 * 2022 2023 2024
 * 2025 2026 2027
 * 2028 2029 2030
 */
export const getStartDecadePosition = (year: number) => year - (year % 10) - 1;

export const getCurrentYearPosition = (
  year: number,
  { mode, numberOfYears }: YearsConfig,
) =>
  mode === 'decade'
    ? getStartDecadePosition(year)
    : getFluidYearPosition(year, numberOfYears);
