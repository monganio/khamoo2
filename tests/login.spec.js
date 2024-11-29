import { test, expect } from '@playwright/test';

test('User can log in successfully', async ({ page }) => {
  await page.goto('https://khamoo-app.web.app/');
  await page.click('text=Log in / Sign Up');

  await page.fill('input[placeholder="Email"]', 'test@example.com');
  await page.fill('input[placeholder="Password"]', 'Test1234');
  await page.getByRole('button', { name: 'Log in', exact: true }).click();

  await expect(page.getByRole('banner').getByText('Test')).toBeVisible();
});
