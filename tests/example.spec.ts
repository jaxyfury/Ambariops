
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/AmberOps Console/);
});

test('dashboard has clusters card', async ({ page }) => {
  await page.goto('/dashboard');

  // Expects page to have a heading h1 with name of Dashboard.
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  await expect(page.getByText('Total Clusters')).toBeVisible();
});
