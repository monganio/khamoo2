import { test, expect } from '@playwright/test';

test('User can edit their own post', async ({ page }) => {
  await page.goto('https://khamoo-app.web.app/');
  
  await page.click('text=Log in / Sign Up');
  await page.fill('input[placeholder="Email"]', 'test@example.com');
  await page.fill('input[placeholder="Password"]', 'Test1234');
  await page.getByRole('button', { name: 'Log in', exact: true }).click();
  await page.getByRole('button', { name: 'X' }).click();

  await page.getByRole('button', { name: 'Edit' }).click();

  await page.fill('input[placeholder="Topic"]', 'Edited Test Post Title');
  await page.fill('textarea[placeholder="Content"]', 'This is the edited content.');

  await page.getByRole('button', { name: 'Save' }).click();

  await expect(page.locator('h2:has-text("Edited Test Post Title")')).toBeVisible();
});
