import { test, expect } from '@playwright/test';

test('successfully', async ({ page }) => {
  await page.goto('https://khamoo-app.web.app/');

  await page.click('text=Log in / Sign Up');
  await page.fill('input[placeholder="Email"]', 'test@example.com');
  await page.fill('input[placeholder="Password"]', 'Test1234');
  await page.getByRole('button', { name: 'Log in', exact: true }).click();
  await expect(page.getByRole('banner').getByText('Test')).toBeVisible();

  await page.getByRole('button', { name: '+' }).click();
  await page.waitForTimeout(1000);
  await page.fill('input[placeholder="Topic"]', 'Test Post Title');
  await page.fill('textarea[placeholder="Content"]', 'This is a test post.');
  await page.getByRole('button', { name: 'Post' }).click();
  await page.waitForTimeout(2000);
  await expect(page.locator('h2:has-text("Test Post Title")')).toBeVisible();

  const post = await page.locator('.post-card').first(); 
  const likeButton = post.locator('button.like-button');
  await likeButton.click();
  await page.waitForTimeout(1000);
  const likeCount = await page.locator('button.like-button').first().innerText();
  expect(likeCount).toBe('❤️ 1');

  await page.getByText('💬').first().click();
  await page.getByPlaceholder('Write your comment...').fill('test comment');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('Test: test comment').first()).toBeVisible();

  await page.getByRole('button', { name: 'Edit' }).first().click();
  await page.fill('input[placeholder="Topic"]', 'Edited Test Post Title');
  await page.fill('textarea[placeholder="Content"]', 'This is the edited content.');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.locator('h2:has-text("Edited Test Post Title")')).toBeVisible();

  await page.getByRole('button', { name: 'Delete' }).first().click();
  await page.waitForTimeout(1000);
  await expect(page.locator('h2:has-text("Edit Test Post Title")')).not.toBeVisible();
});