import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await page.getByPlaceholder('Enter a search here!').click();
  await page.getByPlaceholder('Enter a search here!').fill('superman');
  await page.getByPlaceholder('Enter a search here!').press('Enter');
  await page.getByPlaceholder('Enter a search here!').click();
  await page.getByPlaceholder('Enter a search here!').press('Shift+Home');
  await page.getByPlaceholder('Enter a search here!').fill('spiderman');
  await page.getByLabel('submit Button').click();
  await page.getByRole('cell', { name: 'Image of the movie Spider-Man Spider-Man Release Date: 1990-01-01 Movie Score:' }).click();
  await page.getByText('Spider-Man: No Way Home Release Date: 2021-12-15 Movie Score: 7.984 Peter').click();
  await page.getByText('Following the events of').click();
  await page.getByLabel('Filters Button').click();
  await page.getByRole('textbox').nth(1).click();
  await page.getByRole('textbox').nth(1).click();
  await page.getByRole('textbox').nth(1).click();
  await page.getByRole('textbox').nth(1).press('CapsLock');
  await page.getByRole('textbox').nth(1).click();
  await page.getByRole('textbox').nth(1).fill('2010-06');
  await page.getByRole('textbox').nth(1).press('Enter');
  await page.getByLabel('Checkbox for Filter').first().uncheck();
  await page.getByLabel('Checkbox for Filter').first().check();
  await page.getByLabel('submit Button').click();
  await page.getByRole('cell', { name: 'Image of the movie The Amazing Spider-Man The Amazing Spider-Man Release Date:' }).getByLabel('Button to Find Similar Movies').click();

  
});





