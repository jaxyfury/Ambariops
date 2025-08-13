import { test, expect } from '@playwright/test';

test.describe('Settings Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/settings');
  });

  test('should display the Settings page with all tabs', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'General' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'User Management' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Integrations' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'API Access' })).toBeVisible();
  });

  test('should show general settings content on click', async ({ page }) => {
    await page.getByRole('tab', { name: 'General' }).click();
    await expect(page.getByLabel('Full Name')).toBeVisible();
    await expect(page.getByLabel('Email Address')).toBeVisible();
  });

  test('should manage users correctly', async ({ page }) => {
    await page.getByRole('tab', { name: 'User Management' }).click();
    
    // Open the modal
    await page.getByRole('button', { name: 'Add User' }).click();
    await expect(page.getByRole('heading', { name: 'Add New User' })).toBeVisible();

    // Fill out the form
    await page.getByLabel('Name').fill('Test User');
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByRole('combobox').first().click();
    await page.getByRole('option', { name: 'Admin' }).click();

    // Submit the form
    await page.getByRole('button', { name: 'Save User' }).click();
    await expect(page.getByRole('heading', { name: 'Add New User' })).not.toBeVisible();

    // Verify the new user is in the table
    await expect(page.getByRole('cell', { name: 'Test User' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'test@example.com' })).toBeVisible();
  });

  test('should show integrations content on click', async ({ page }) => {
    await page.getByRole('tab', { name: 'Integrations' }).click();
    await expect(page.getByText('Slack')).toBeVisible();
    await expect(page.getByText('PagerDuty')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add Integration' })).toBeVisible();
  });

  test('should show API access content on click', async ({ page }) => {
    await page.getByRole('tab', { name: 'API Access' }).click();
    await expect(page.getByText('CI/CD Pipeline Key')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Generate New Key' })).toBeVisible();
  });
});
