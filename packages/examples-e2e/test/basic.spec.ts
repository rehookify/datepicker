import { expect, test } from '@playwright/test';

test('basic month navigation', async ({ page }) => {
  await page.goto('/');

  const previousMonthButton = page.getByRole('button', {
    name: /previous month button/i,
  });
  const nextMonthButton = page.getByRole('button', {
    name: /next month button/i,
  });

  await expect(nextMonthButton).toBeDisabled();
  await expect(previousMonthButton).toBeEnabled();

  await previousMonthButton.click();
  await expect(nextMonthButton).toBeEnabled();
});
