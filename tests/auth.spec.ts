
import { test, expect } from '@playwright/test';

test.describe('Authentication Pages', () => {
  test('should display the landing page', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'The Future of Cluster Management is Here' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Admin Login' })).toBeVisible();
  });

  test('should navigate to the login page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Admin Login' }).click();
    await expect(page).toHaveURL(/.*\/login/);
    await expect(page.getByRole('heading', { name: 'Admin Login' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Google' })).toBeVisible();
  });
  
  test('should navigate to the signup page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Get Started for Free' }).first().click();
    await expect(page).toHaveURL(/.*\/signup/);
    await expect(page.getByRole('heading', { name: 'Create Account' })).toBeVisible();
  });
});
