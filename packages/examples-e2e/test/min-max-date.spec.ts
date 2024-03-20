import { expect, test } from '@playwright/test';

test('month and years availability with min and max date', async ({ page }) => {
  await page.goto('/');

  const NOW = new Date();
  const Y = NOW.getFullYear();
  const M = NOW.getMonth();
  const currentMonthName = NOW.toLocaleDateString('en-us', { month: 'long' });

  const nextMonth = new Date(Y, M + 1, 1);
  const nextMonthName = nextMonth.toLocaleDateString('en-us', {
    month: 'long',
  });

  // Previous year should be enabled since we are defining minDate as new Date(Y - 1, 0, 1)
  await expect(page.getByRole('button', { name: `${Y - 1}` })).toBeEnabled();

  // Next year is disabled since we are defining maxDate as new Date()
  await expect(page.getByRole('button', { name: `${Y + 1}` })).toBeDisabled();

  // Current month should be enabled
  await expect(
    page.getByRole('button', { name: currentMonthName }),
  ).toBeEnabled();

  // Next month should be disabled since we are defining maxDate as new Date()
  await expect(
    page.getByRole('button', { name: nextMonthName }),
  ).toBeDisabled();

  await page.getByRole('button', { name: `${Y - 1}` }).click();
  await expect(page.getByRole('button', { name: /january/i })).toBeEnabled();
});
