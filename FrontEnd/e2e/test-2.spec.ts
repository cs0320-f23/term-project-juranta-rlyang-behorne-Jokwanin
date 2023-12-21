import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await page.getByPlaceholder('Enter a search here!').click();
  await page.getByPlaceholder('Enter a search here!').fill('avengers');
  await page.getByPlaceholder('Enter a search here!').press('Enter');
  await page.getByLabel('Filters Button').click();
  await page.getByPlaceholder('e.g. 1.0').click();
  await page.getByPlaceholder('e.g. 1.0').fill('8');
  await page.getByPlaceholder('e.g. 10.0').click();
  await page.getByPlaceholder('e.g. 10.0').fill('10');
  await page.getByLabel('submit Button').click();
  await page.getByLabel('Release Date: 2018-04-').click();
  await page.getByText('As the Avengers and their').click();
  await page.getByText('After the devastating events').click();
  await page.getByLabel('Avengers: Endgame', { exact: true }).click();
  await page.getByLabel('Avengers: Infinity War', { exact: true }).click();
  await page.getByRole('cell', { name: 'Image of the movie Avengers: Infinity War Avengers: Infinity War Release Date:' }).getByLabel('Button to Find Similar Movies').click();
  await page.getByText('Release Date: to Apply Filter: Audience Rating: to Apply Filter:').click();
});