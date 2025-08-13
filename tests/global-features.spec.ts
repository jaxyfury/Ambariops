import { test, expect } from '@playwright/test';

test.describe('Global Features', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
  });

  test('sidebar can be toggled', async ({ page }) => {
    await expect(page.locator('[data-sidebar="sidebar"]')).toHaveAttribute('data-state', 'expanded');
    await page.getByRole('button', { name: 'Toggle Sidebar' }).click();
    await expect(page.locator('[data-sidebar="sidebar"]')).toHaveAttribute('data-state', 'collapsed');
  });

  test('theme can be toggled', async ({ page }) => {
    const html = page.locator('html');
    await expect(html).not.toHaveClass('dark');
    await page.getByLabel('Toggle theme').click();
    await page.getByRole('menuitem', { name: 'Dark' }).click();
    await expect(html).toHaveClass(/dark/);
  });

  test('global search works', async ({ page }) => {
    await page.getByRole('button', { name: 'Search...' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.getByPlaceholder('Search for clusters, services, hosts...').fill('prod');
    await expect(page.getByRole('link', { name: 'Production Cluster' })).toBeVisible();
  });
  
  test('quick access modal works', async ({ page }) => {
    await page.getByLabel('Open quick access menu').click();
    await expect(page.getByRole('heading', { name: 'Quick Access' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Manage Clusters' })).toBeVisible();
    await page.getByLabel('Close').click();
    await expect(page.getByRole('heading', { name: 'Quick Access' })).not.toBeVisible();
  });
});
