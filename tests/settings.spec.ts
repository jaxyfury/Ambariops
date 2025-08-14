import { test, expect } from '@playwright/test';

test.describe('Settings Page', () => {
  test.beforeEach(async ({ page }) => {
    // Log in as a regular user first
    await page.goto('http://localhost:3001/auth');
    await page.getByPlaceholder('Email').fill('jayprakash@gmail.com');
    await page.getByPlaceholder('Password').fill('123456');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.waitForURL('http://localhost:3000/dashboard');
    
    // Navigate to the settings page in the main web app
    await page.goto('/settings');
  });

  test('should display the General Settings tab by default', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'General Settings' })).toBeVisible();
    await expect(page.getByLabel('Full Name')).toHaveValue('Jay Prakash');
  });

  test('should switch to Integrations tab', async ({ page }) => {
    await page.getByRole('tab', { name: 'Integrations' }).click();
    await expect(page.getByRole('heading', { name: 'Third-Party Integrations' })).toBeVisible();
    await expect(page.getByText('Slack')).toBeVisible();
  });

  test('should switch to API Access tab', async ({ page }) => {
    await page.getByRole('tab', { name: 'API Access' }).click();
    await expect(page.getByRole('heading', { name: 'API Access' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Generate New Key' })).toBeVisible();
  });
});
