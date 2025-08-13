
import { test, expect } from '@playwright/test';

test.describe('Authentication Pages', () => {
  test('should display the landing page', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Unified Cluster Management, Supercharged by AI' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Admin Login' })).toBeVisible();
  });

  test('should navigate to the auth page from login button', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Admin Login' }).click();
    await expect(page).toHaveURL(/.*\/auth/);
    await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
  });
  
  test('should navigate to the auth page from get started link', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Get Started for Free' }).first().click();
    await expect(page).toHaveURL(/.*\/auth\?action=signup/);
    await expect(page.getByRole('heading', { name: 'Create Account' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign Up' })).toBeVisible();
  });
});
