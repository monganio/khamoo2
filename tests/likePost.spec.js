import { test, expect } from '@playwright/test';

test('User can like a post', async ({ page }) => {
  await page.goto('https://khamoo-app.web.app/');

  await page.click('text=Log in / Sign Up');
  await page.getByPlaceholder('Email').fill('test@example.com');
  await page.getByPlaceholder('Password').fill('testpassword');
  await page.getByRole('button', { name: 'Log in', exact: true }).click();
  
  const likeButton = await page.getByRole('button', { name: /❤️ 0/ });
  const initialLikes = await likeButton.textContent();

  await likeButton.click();
  await page.waitForTimeout(1000);
  
  const updatedLikes = await likeButton.textContent();
  await page.waitForTimeout(1000);
  expect(Number(updatedLikes)).toBe(Number(initialLikes) + 1);
});
