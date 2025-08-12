import { test, expect } from '@playwright/test';

test.describe('Main Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
  });

  test('should navigate to all main pages from sidebar and show breadcrumbs', async ({ page }) => {
    await page.getByRole('link', { name: 'Clusters' }).click();
    await expect(page).toHaveURL(/.*clusters/);
    await expect(page.getByRole('heading', { name: 'Clusters' })).toBeVisible();
    await expect(page.getByLabel('Breadcrumb').getByRole('link', { name: 'Clusters' })).toBeVisible();

    await page.getByRole('link', { name: 'Services' }).click();
    await expect(page).toHaveURL(/.*services/);
    await expect(page.getByRole('heading', { name: 'Services' })).toBeVisible();
    await expect(page.getByLabel('Breadcrumb').getByRole('link', { name: 'Services' })).toBeVisible();

    await page.getByRole('link', { name: 'Hosts' }).click();
    await expect(page).toHaveURL(/.*hosts/);
    await expect(page.getByRole('heading', { name: 'Hosts' })).toBeVisible();
    await expect(page.getByLabel('Breadcrumb').getByRole('link', { name: 'Hosts' })).toBeVisible();

    await page.getByRole('button', { name: 'Alerts' }).click();
    await page.getByRole('link', { name: 'Current Alerts' }).click();
    await expect(page).toHaveURL(/.*alerts/);
    await expect(page.getByRole('heading', { name: 'Alerts' })).toBeVisible();
    await expect(page.getByLabel('Breadcrumb').getByRole('link', { name: 'Alerts' })).toBeVisible();
    
    await page.getByRole('button', { name: 'Alerts' }).click();
    await page.getByRole('link', { name: 'Definitions' }).click();
    await expect(page).toHaveURL(/.*alerts\/definitions/);
    await expect(page.getByRole('heading', { name: 'Alert Definitions' })).toBeVisible();
    await expect(page.getByLabel('Breadcrumb').getByRole('link', { name: 'Definitions' })).toBeVisible();

    await page.getByRole('link', { name: 'Configuration' }).click();
    await expect(page).toHaveURL(/.*config/);
    await expect(page.getByRole('heading', { name: 'Configuration Editor' })).toBeVisible();
    await expect(page.getByLabel('Breadcrumb').getByRole('link', { name: 'Config' })).toBeVisible();


    await page.getByRole('link', { name: 'Tasks / Ops' }).click();
    await expect(page).toHaveURL(/.*tasks/);
    await expect(page.getByRole('heading', { name: 'Tasks & Operations' })).toBeVisible();
    await expect(page.getByLabel('Breadcrumb').getByRole('link', { name: 'Tasks' })).toBeVisible();
    
    await page.getByRole('link', { name: 'Logs' }).click();
    await expect(page).toHaveURL(/.*logs/);
    await expect(page.getByRole('heading', { name: 'Log Search' })).toBeVisible();
    await expect(page.getByLabel('Breadcrumb').getByRole('link', { name: 'Logs' })).toBeVisible();

    await page.getByRole('link', { name: 'Settings' }).click();
    await expect(page).toHaveURL(/.*settings/);
    await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible();
    await expect(page.getByLabel('Breadcrumb').getByRole('link', { name: 'Settings' })).toBeVisible();
  });
});
