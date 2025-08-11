import { test, expect } from '@playwright/test';

test.describe('Other Application Pages', () => {
  const pages = [
    { name: 'Services', url: '/services' },
    { name: 'Hosts', url: '/hosts' },
    { name: 'Configuration Editor', url: '/config' },
    { name: 'Tasks & Operations', url: '/tasks' },
    { name: 'Log Search', url: '/logs' },
    { name: 'Settings', url: '/settings' },
    { name: 'Help & Support', url: '/help' },
  ];

  for (const pageInfo of pages) {
    test(`should display the ${pageInfo.name} page`, async ({ page }) => {
      await page.goto(pageInfo.url);
      await expect(page.getByRole('heading', { name: pageInfo.name })).toBeVisible();
    });
  }
});
