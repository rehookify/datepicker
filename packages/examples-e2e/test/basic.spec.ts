import { expect, test } from '@playwright/test';

test('test basic month navigation', async ({ page }) => {
  await page.goto('/');

  const previousMonthButton = page.getByTestId('previous-month-button');
  const nextMonthButton = page.getByTestId('next-month-button');

  await expect(nextMonthButton).toBeDisabled();
  await expect(previousMonthButton).toBeEnabled();

  await previousMonthButton.click();
  await expect(nextMonthButton).toBeEnabled();
});
