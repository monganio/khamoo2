import { test, expect } from '@playwright/test';

test('User can comment on a post', async ({ page }) => {
  await page.goto('https://khamoo-app.web.app/');

  await page.click('text=Log in / Sign Up');
  await page.fill('input[placeholder="Email"]', 'test@example.com');
  await page.fill('input[placeholder="Password"]', 'Test1234');
  await page.getByRole('button', { name: 'Log in', exact: true }).click();
  await page.waitForTimeout(3000);

  await page.getByText('💬').first().click();

  await page.getByPlaceholder('Write your comment...').fill('test comment');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.waitForTimeout(1000);

  await expect(page.getByText('Test: test comment').first()).toBeVisible();
});
