import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await page.getByPlaceholder('Enter a search here!').click();
  await page.getByPlaceholder('Enter a search here!').fill('hunger games');
  await page.getByLabel('submit Button').click();
  await page.getByLabel('Filters Button').click();
  await page.getByRole('textbox').nth(1).click();
  await page.getByRole('textbox').nth(1).press('Tab');
  await page.getByRole('textbox').nth(1).fill('2023-01');
  await page.getByLabel('submit Button').click();
  await page.getByRole('cell', { name: 'Image of the movie The Hunger' }).getByLabel('Button to Find Similar Movies').click();
  await page.getByPlaceholder('Enter a search here!').click();
  await page.getByPlaceholder('Enter a search here!').press('Enter');
  await page.getByPlaceholder('e.g. 1.0').click();
  await page.getByPlaceholder('e.g. 1.0').fill('7');
  await page.getByLabel('submit Button').click();
});