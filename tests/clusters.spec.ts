import { test, expect } from '@playwright/test';

test.describe('Clusters Pages', () => {
  test('should display the clusters list page', async ({ page }) => {
    await page.goto('/clusters');
    await expect(page.getByRole('heading', { name: 'Clusters' })).toBeVisible();
    await expect(page.getByText('Production Cluster')).toBeVisible();
    await expect(page.getByText('Development Cluster')).toBeVisible();
  });

  test('should navigate to the cluster detail page', async ({ page }) => {
    await page.goto('/clusters');
    await page.getByRole('link', { name: 'View Details' }).first().click();
    
    await expect(page).toHaveURL(/.*clusters\/prod-cluster-1/);
    await expect(page.getByRole('heading', { name: 'Production Cluster' })).toBeVisible();
    
    // Check for key cards on detail page
    await expect(page.getByText('Status')).toBeVisible();
    await expect(page.getByText('CPU Usage')).toBeVisible();
    await expect(page.getByText('Active Alerts')).toBeVisible();
    await expect(page.getByText('Services')).toBeVisible();
    await expect(page.getByText('Hosts')).toBeVisible();
  });
});
