import { expect, test } from '@playwright/test';

test('month and years availability with min and max date', async ({ page }) => {
  await page.goto('/');

  const NOW = new Date();
  const Y = NOW.getFullYear();
  const currentMonthName = NOW.toLocaleDateString('en-us', { month: 'long' });

  // Previous year should be enabled since we are defining minDate as new Date(Y - 1, 0, 1)
  await expect(page.getByRole('button', { name: `${Y - 1}` })).toBeEnabled();

  // Next year is disabled since we are defining maxDate as new Date()
  await expect(page.getByRole('button', { name: `${Y + 1}` })).toBeDisabled();

  // Current month should be enabled
  await expect(
    page.getByRole('button', { name: currentMonthName }),
  ).toBeEnabled();

  const nextMonthButton = page.getByRole('button', {
    name: /next month button/i,
  });
  const previousMonthButton = page.getByRole('button', {
    name: /previous month button/i,
  });

  await expect(nextMonthButton).toBeDisabled();
  await expect(previousMonthButton).toBeEnabled();

  await previousMonthButton.click();
  await expect(nextMonthButton).toBeEnabled();
});
