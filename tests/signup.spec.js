import { test, expect } from '@playwright/test';

test('User can sign up successfully', async ({ page }) => {
  await page.goto('https://khamoo-app.web.app/');
  
  await page.getByRole('button', { name: 'Log in / Sign Up' }).click();
  
  await page.waitForSelector('.auth-content');

  await page.getByText('Sign up', { exact: true }).click();

  await page.getByPlaceholder('Email').fill('barbie@example.com');
  await page.getByPlaceholder('Username').fill('Barbie');
  await page.getByPlaceholder('Password').fill('Barbie1234');

  await page.getByRole('button', { name: 'Sign up', exact: true }).click();
});