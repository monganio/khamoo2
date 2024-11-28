import { test, expect } from '@playwright/test';

test('User can delete their own post', async ({ page }) => {
  await page.goto('https://khamoo-app.web.app/');

  await page.click('text=Log in / Sign Up');
  await page.fill('input[placeholder="Email"]', 'test@example.com');
  await page.fill('input[placeholder="Password"]', 'testpassword');
  await page.getByRole('button', { name: 'Log in', exact: true }).click();

  await page.getByRole('button', { name: 'Delete' }).click();

  await expect(page.locator('h2:has-text("Edited Test Post Title")')).not.toBeVisible();
});
