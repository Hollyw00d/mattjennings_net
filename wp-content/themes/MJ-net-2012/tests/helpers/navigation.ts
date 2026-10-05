import type { Page } from '@playwright/test';

export async function goToHomepage(page: Page) {
  await page.goto('https://www.mattjennings.net/');
}
