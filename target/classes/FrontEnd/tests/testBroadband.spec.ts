import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('broadband Maine Kennebec');
  await page.getByPlaceholder('Enter command here!').press('Enter');
  await page.getByText('Broadband access in Kennebec, Maine is : 87.0% Date and time retrieved:').click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('Broadband California Los Angeles');
  await page.getByPlaceholder('Enter command here!').press('Enter');
  await page.getByPlaceholder('Enter command here!').fill('broadband New Jersey middlesex');
  await page.getByPlaceholder('Enter command here!').press('Enter');
  await page.getByText('Broadband access in middlesex, New Jersey is : 90.6% Date and time retrieved:').click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('Broadband New Jersey');
  await page.getByPlaceholder('Enter command here!').press('Enter');
  await page.getByText('Output: The data source wasn\'t accessible.').click();
});