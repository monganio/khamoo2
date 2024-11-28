import { test, expect } from '@playwright/test';

test('User can create a new post', async ({ page }) => {
  await page.goto('https://khamoo-app.web.app/');
  
  await page.click('text=Log in / Sign Up');
  await page.fill('input[placeholder="Email"]', 'test@example.com');
  await page.fill('input[placeholder="Password"]', 'Test1234');
  await page.getByRole('button', { name: 'Log in', exact: true }).click();
  await page.getByRole('button', { name: 'X' }).click();

  await page.getByRole('button', { name: '+' }).click();

  await page.waitForTimeout(1000);

  await page.fill('input[placeholder="Topic"]', 'Test Post Title');
  await page.fill('textarea[placeholder="Content"]', 'This is a test post.');

  await page.getByRole('button', { name: 'Post' }).click();

  await page.waitForTimeout(2000);

  await expect(page.locator('h2:has-text("Test Post Title")')).toBeVisible();
});
