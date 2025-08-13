import { test, expect } from '@playwright/test';

// This test requires authentication, which would be handled in a real project
// with a setup that logs in the user before tests run.
// For this prototype, we'll assume we can navigate directly to the dashboard.
test.describe('Dashboard Page', () => {
  const DASHBOARD_URL = 'http://localhost:3000/dashboard';

  test.beforeEach(async ({ page }) => {
    // Clear session storage to ensure the tour runs on each test
    await page.goto(DASHBOARD_URL);
    await page.evaluate(() => window.sessionStorage.clear());
    await page.goto(DASHBOARD_URL);
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

  test('should show onboarding tour and allow skipping it', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Welcome!' })).toBeVisible();
    await expect(page.getByText('Welcome to AmberOps! This is your main dashboard')).toBeVisible();
    await page.getByRole('button', { name: 'Skip' }).click();
    await expect(page.getByRole('heading', { name: 'Welcome!' })).not.toBeVisible();
  });
});
