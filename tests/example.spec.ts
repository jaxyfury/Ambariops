import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/dashboard', { waitUntil: 'networkidle' });
  await expect(page).toHaveTitle(/AmberOps/);
});

test('dashboard has clusters card', async ({ page }) => {
  await page.goto('/dashboard', { waitUntil: 'networkidle' });
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  await expect(page.getByText('Total Clusters')).toBeVisible();
});

test('sidebar can be toggled', async ({ page }) => {
    await page.goto('/dashboard', { waitUntil: 'networkidle' });
    await expect(page.locator('[data-sidebar="sidebar"]')).toHaveAttribute('data-state', 'expanded');
    await page.getByLabel('Toggle Sidebar').click();
    await expect(page.locator('[data-sidebar="sidebar"]')).toHaveAttribute('data-state', 'collapsed');
});

test('data table export works', async ({ page }) => {
    await page.goto('/clusters', { waitUntil: 'networkidle' });
    
    // Wait for the table to finish loading
    await expect(page.locator('[role="cell"]:has-text("Production Cluster")')).toBeVisible();

    const downloadPromise = page.waitForEvent('download');
    await page.getByTestId('export-button').click();
    await page.getByTestId('export-excel').click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe('table_data.xlsx');
});

test('user management modal works', async ({ page }) => {
    await page.goto('/settings', { waitUntil: 'networkidle' });
    
    // Open the modal
    await page.getByRole('button', { name: 'Add User' }).click();
    await expect(page.getByRole('heading', { name: 'Add New User' })).toBeVisible();

    // Fill out the form
    await page.getByLabel('Name').fill('Test User');
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByRole('combobox').click();
    await page.getByRole('option', { name: 'Admin' }).click();

    // Submit the form
    await page.getByRole('button', { name: 'Save User' }).click();
    await expect(page.getByRole('heading', { name: 'Add New User' })).not.toBeVisible();

    // Verify the new user is in the table
    await expect(page.getByRole('cell', { name: 'Test User' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'test@example.com' })).toBeVisible();
});

test('clear filter button works', async ({ page }) => {
    await page.goto('/clusters', { waitUntil: 'networkidle' });
    
    // Wait for the table to finish loading
    await expect(page.locator('[role="cell"]:has-text("Production Cluster")')).toBeVisible();
    
    const clearButton = page.getByRole('tooltip', { name: 'Clear all filters and' }).locator('..');

    // Initially, the button should not be visible
    await expect(clearButton).not.toBeVisible();

    // Type in the filter input
    await page.getByPlaceholder('Filter by name...').fill('Prod');
    await expect(page.getByRole('cell', { name: 'Development Cluster' })).not.toBeVisible();
    
    // Now the button should be visible
    await expect(clearButton).toBeVisible();

    // Click the clear button
    await clearButton.click();

    // The filter should be cleared and the button should disappear
    await expect(page.getByPlaceholder('Filter by name...')).toHaveValue('');
    await expect(page.getByRole('cell', { name: 'Development Cluster' })).toBeVisible();
    await expect(clearButton).not.toBeVisible();
});
