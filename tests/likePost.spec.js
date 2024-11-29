import { test, expect } from '@playwright/test';

test('User can like a post', async ({ page }) => {
  await page.goto('https://khamoo-app.web.app/');
  
  await page.click('text=Log in / Sign Up');
  await page.fill('input[placeholder="Email"]', 'test@example.com');
  await page.fill('input[placeholder="Password"]', 'Test1234');
  await page.getByRole('button', { name: 'Log in', exact: true }).click();
  
  const post = await page.locator('.post-card').first(); 
  const likeButton = post.locator('button.like-button');

  await likeButton.click();
await page.waitForTimeout(1000);

const likeCount = await page.locator('button.like-button').first().innerText();
expect(likeCount).toBe('❤️ 1');

});
