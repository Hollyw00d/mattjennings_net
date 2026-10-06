import 'dotenv/config';
import type { Page, Expect } from '@playwright/test';

export async function goToHomepage(page: Page) {
  const homeURL = process.env.HOME_URL;

  if (!homeURL) {
    throw new Error('URL environment variable is not defined');
  }

  await page.goto(homeURL);
}

export async function selectReactFromDropdown(page: Page, expect: Expect) {
  await page.waitForLoadState('domcontentloaded');

  await page.getByLabel('Choose Portfolio Project').selectOption('React');
  await expect(page).toHaveURL(`${process.env.HOME_URL}?portfolio=react`);
}
