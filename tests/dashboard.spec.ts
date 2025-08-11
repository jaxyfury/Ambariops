
import { test, expect } from '@playwright/test';

test.describe('Dashboard Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
  });

  test('should display the dashboard title', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });

  test('should display summary cards with correct data', async ({ page }) => {
    await expect(page.getByText('Total Clusters')).toBeVisible();
    await expect(page.getByText('Active Alerts')).toBeVisible();
    await expect(page.getByText('Avg. CPU Usage')).toBeVisible();
    await expect(page.getByText('Avg. Memory Usage')).toBeVisible();
  });
  
  test('should display cluster status table with mock data', async ({ page }) => {
    await expect(page.getByRole('table')).nth(0).toBeVisible();
    await expect(page.getByText('Production Cluster')).toBeVisible();
    await expect(page.getByText('Development Cluster')).toBeVisible();
  });

  test('should display critical alerts table with mock data', async ({ page }) => {
    await expect(page.getByRole('table')).nth(1).toBeVisible();
    await expect(page.getByText('HDFS Storage Capacity')).toBeVisible();
  });

  test('should navigate to cluster detail page on row click', async ({ page }) => {
    await page.getByRole('link', { name: 'Production Cluster' }).click();
    await expect(page).toHaveURL(/.*clusters\/prod-cluster-1/);
    await expect(page.getByRole('heading', { name: 'Production Cluster' })).toBeVisible();
  });

  test('should navigate to alerts page from critical alerts card', async ({ page }) => {
    await page.getByRole('link', { name: 'View All Alerts' }).click();
    await expect(page).toHaveURL(/.*alerts/);
    await expect(page.getByRole('heading', { name: 'Alerts' })).toBeVisible();
  });
});
