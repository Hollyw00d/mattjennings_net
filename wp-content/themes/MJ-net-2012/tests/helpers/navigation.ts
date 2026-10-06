import 'dotenv/config';
import type { Page } from '@playwright/test';

export async function goToHomepage(page: Page) {
  const homeURL = process.env.HOME_URL;

  if (!homeURL) {
    throw new Error('URL environment variable is not defined');
  }

  await page.goto(homeURL);
}
