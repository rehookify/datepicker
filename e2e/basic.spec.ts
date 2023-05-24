import { expect, test } from '@playwright/test';

import { DEFAULT_LOCALE_CONFIG } from '../src/constants';
import { formatMonthName, subtractFromDate } from '../src/utils/date';

test('test basic month navigation', async ({ page }) => {
  await page.goto('/');

  const NOW = new Date();

  const previousMonthButton = page.getByTestId('previous-month-button');
  const nextMonthButton = page.getByTestId('next-month-button');

  const currentCalendarHeader = page.getByTestId('main-calendar-title');

  await expect(nextMonthButton).toBeDisabled();

  await expect(currentCalendarHeader).toHaveText(
    `${formatMonthName(NOW, DEFAULT_LOCALE_CONFIG)} ${NOW.getFullYear()}`,
  );

  await previousMonthButton.click();

  const previousMonth = subtractFromDate(NOW, 1, 'month');
  await expect(currentCalendarHeader).toHaveText(
    `${formatMonthName(
      previousMonth,
      DEFAULT_LOCALE_CONFIG,
    )} ${previousMonth.getFullYear()}`,
  );
});
