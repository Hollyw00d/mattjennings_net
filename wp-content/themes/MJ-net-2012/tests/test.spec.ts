import { test, expect } from '@playwright/test';

test('homepage has footer copyright', async ({ page }) => {
  await page.goto('https://www.mattjennings.net/');
  await page.getByText('© 2026 Matt Jennings. All rights reserved.');
});

test('homepage select REACT from drop-dopwn & go to portfolio page', async ({
  page
}) => {
  await page.goto('https://www.mattjennings.net/');
  await page.getByLabel('Choose Portfolio Project').selectOption('React');
  await expect(page).toHaveURL('https://www.mattjennings.net/?portfolio=react');
  await page.getByRole('link', { name: 'Weekly Meetings Block' }).click();
  await expect(page).toHaveURL(
    'https://www.mattjennings.net/portfolio-feed/weekly-meetings-block-wordpress-plugin-using-react'
  );
});
