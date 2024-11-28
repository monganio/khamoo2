import { test, expect } from '@playwright/test';

test('User can comment on a post', async ({ page }) => {
  await page.goto('https://khamoo-app.web.app/');

  await page.click('text=Log in / Sign Up');
  await page.fill('input[placeholder="Email"]', 'test@example.com');
  await page.fill('input[placeholder="Password"]', 'testpassword');
  await page.getByRole('button', { name: 'Log in', exact: true }).click();

  await page.getByText('💬 0').click();
  await page.getByPlaceholder('Write your comment...').fill('This is a test comment.');
  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page.locator('div.comment')).toContainText('This is a test comment.');
});
