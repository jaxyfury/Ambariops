
import { test, expect } from '@playwright/test';

test.describe('Dashboard Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
  });

  test('should display the dashboard title', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });

  test('should display total clusters card with correct data', async ({ page }) => {
    const totalClustersCard = page.locator('div:has-text("Total Clusters")').nth(2);
    await expect(totalClustersCard).toBeVisible();
    await expect(totalClustersCard.getByText('3')).toBeVisible();
    await expect(totalClustersCard.getByText('1 healthy')).toBeVisible();
  });

  test('should display active alerts card with correct data', async ({ page }) => {
    const activeAlertsCard = page.locator('div:has-text("Active Alerts")').nth(1);
    await expect(activeAlertsCard).toBeVisible();
    await expect(activeAlertsCard.getByText('2')).toBeVisible();
  });

  test('should display cluster status table with correct data', async ({ page }) => {
    const clusterStatusTable = page.getByRole('table', { name: 'Cluster Status' });
    await expect(clusterStatusTable).toBeVisible();
    
    const rows = clusterStatusTable.getByRole('row');
    await expect(rows).toHaveCount(4); 

    // Check header
    await expect(rows.first().getByRole('cell', { name: 'Status' })).toBeVisible();
    await expect(rows.first().getByRole('cell', { name: 'Name' })).toBeVisible();

    // Check data rows
    await expect(rows.nth(1).getByText('Production Cluster')).toBeVisible();
    await expect(rows.nth(2).getByText('Development Cluster')).toBeVisible();
    await expect(rows.nth(3).getByText('Staging Environment')).toBeVisible();
  });

   test('should navigate to cluster detail page on row click', async ({ page }) => {
    await page.getByRole('link', { name: 'Production Cluster' }).click();
    await expect(page).toHaveURL(/.*clusters\/prod-cluster-1/);
    await expect(page.getByRole('heading', { name: 'Production Cluster' })).toBeVisible();
  });

});
