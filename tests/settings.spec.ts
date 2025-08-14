import { test, expect } from '@playwright/test';

test.describe('Settings Page', () => {
  test.beforeEach(async ({ page }) => {
    // Log in as admin before each test
    await page.goto('http://localhost:3001/auth');
    await page.getByPlaceholder('Email').fill('admin@amberops.com');
    await page.getByPlaceholder('Password').fill('admin@amberops');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.waitForURL('http://localhost:3003/dashboard');
    
    // Navigate to the settings page in the admin app
    await page.goto('http://localhost:3003/users');
  });

  test('should display the User Management page', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'User Management' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'New User' })).toBeVisible();
  });

  test('should add, update, and delete a user', async ({ page }) => {
    // Add user
    await page.getByRole('button', { name: 'New User' }).click();
    await expect(page.getByRole('heading', { name: 'Add New User' })).toBeVisible();
    await page.getByLabel('Name').fill('Test User');
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('combobox').first().click();
    await page.getByRole('option', { name: 'Operator' }).click();
    await page.getByRole('button', { name: 'Save User' }).click();

    // Verify user is in table
    const newRow = page.getByRole('row', { name: /Test User/ });
    await expect(newRow).toBeVisible();
    await expect(newRow.getByRole('cell', { name: 'Operator' })).toBeVisible();
    
    // Update user
    await newRow.getByRole('button', { name: 'Open actions' }).click();
    await page.getByRole('menuitem', { name: 'Edit' }).click();
    await expect(page.getByRole('heading', { name: 'Edit User' })).toBeVisible();
    await page.getByLabel('Name').fill('Test User Updated');
    await page.getByRole('button', { name: 'Save User' }).click();
    const updatedRow = page.getByRole('row', { name: /Test User Updated/ });
    await expect(updatedRow).toBeVisible();
    
    // Delete user
    await updatedRow.getByRole('button', { name: 'Open actions' }).click();
    await page.getByRole('menuitem', { name: 'Delete' }).click();
    await expect(updatedRow).not.toBeVisible();
  });
});
