import { test, expect } from '@playwright/test';

test.describe('Main Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
  });

  test('should navigate to all main pages from sidebar', async ({ page }) => {
    await page.getByRole('link', { name: 'Clusters' }).click();
    await expect(page).toHaveURL(/.*clusters/);
    await expect(page.getByRole('heading', { name: 'Clusters' })).toBeVisible();

    await page.getByRole('link', { name: 'Services' }).click();
    await expect(page).toHaveURL(/.*services/);
    await expect(page.getByRole('heading', { name: 'Services' })).toBeVisible();

    await page.getByRole('link', { name: 'Hosts' }).click();
    await expect(page).toHaveURL(/.*hosts/);
    await expect(page.getByRole('heading', { name: 'Hosts' })).toBeVisible();

    await page.getByRole('button', { name: 'Alerts' }).click();
    await page.getByRole('link', { name: 'Current Alerts' }).click();
    await expect(page).toHaveURL(/.*alerts/);
    await expect(page.getByRole('heading', { name: 'Alerts' })).toBeVisible();
    
    await page.getByRole('button', { name: 'Alerts' }).click();
    await page.getByRole('link', { name: 'Definitions' }).click();
    await expect(page).toHaveURL(/.*alerts\/definitions/);
    await expect(page.getByRole('heading', { name: 'Alert Definitions' })).toBeVisible();

    await page.getByRole('link', { name: 'Configuration' }).click();
    await expect(page).toHaveURL(/.*config/);
    await expect(page.getByRole('heading', { name: 'Configuration Editor' })).toBeVisible();

    await page.getByRole('link', { name: 'Tasks / Ops' }).click();
    await expect(page).toHaveURL(/.*tasks/);
    await expect(page.getByRole('heading', { name: 'Tasks & Operations' })).toBeVisible();
    
    await page.getByRole('link', { name: 'Logs' }).click();
    await expect(page).toHaveURL(/.*logs/);
    await expect(page.getByRole('heading', { name: 'Log Search' })).toBeVisible();

    await page.getByRole('link', { name: 'Settings' }).click();
    await expect(page).toHaveURL(/.*settings/);
    await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible();
  });
});
