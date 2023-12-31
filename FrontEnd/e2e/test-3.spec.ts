import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await page.getByPlaceholder('Enter a search here!').click();
  await page.getByPlaceholder('Enter a search here!').press('CapsLock');
  await page.getByPlaceholder('Enter a search here!').fill('Scary ');
  await page.getByPlaceholder('Enter a search here!').press('CapsLock');
  await page.getByPlaceholder('Enter a search here!').fill('Scary Movie');
  await page.getByLabel('submit Button').click();
  await page.getByLabel('Filters Button').click();
  await page.getByPlaceholder('e.g. 1.0').click();
  await page.getByPlaceholder('e.g. 1.0').fill('5');
  await page.getByPlaceholder('e.g. 10.0').click();
  await page.getByPlaceholder('e.g. 10.0').fill('10');
  await page.getByLabel('submit Button').click();
  await page.getByPlaceholder('e.g. 1.0').click();
  await page.getByPlaceholder('e.g. 1.0').fill('6');
  await page.getByLabel('submit Button').click();
  await page.getByPlaceholder('e.g. 1.0').click();
  await page.getByLabel('Checkbox for Filter').nth(1).uncheck();
  await page.getByLabel('submit Button').click();
  await page.getByRole('textbox').nth(1).click();
  await page.getByRole('textbox').nth(1).click();
  await page.getByRole('textbox').nth(1).click();
  await page.getByRole('textbox').nth(1).click();
  await page.getByRole('textbox').nth(1).click();
  await page.getByRole('textbox').nth(1).click();
  await page.getByRole('textbox').nth(1).click();
  await page.getByRole('textbox').nth(1).click();
  await page.getByRole('textbox').nth(1).press('ArrowRight');
  await page.getByRole('textbox').nth(1).fill('2000-01');
  await page.getByLabel('submit Button').click();
  await page.getByRole('cell', { name: 'Image of the movie Scary Movie Scary Movie Release Date: 2000-07-07 Movie Score' }).getByLabel('Button to Find Similar Movies').click();
  await page.getByPlaceholder('Enter a search here!').dblclick();
  await page.getByPlaceholder('Enter a search here!').dblclick();
  await page.getByPlaceholder('Enter a search here!').click();
  await page.getByPlaceholder('Enter a search here!').fill('borat');
  await page.getByLabel('submit Button').click();
  await page.getByRole('cell', { name: 'Image of the movie Borat Subsequent Moviefilm Borat Subsequent Moviefilm' }).getByLabel('Button to Find Similar Movies').click();
});