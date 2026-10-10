import type { Page, Expect } from '@playwright/test';

export async function viewFooterText(page: Page, expect: Expect) {
  const footer = page.getByRole('contentinfo');
  const date = new Date();
  const currentYear = date.getFullYear();
  await expect(
    footer.getByText(`© ${currentYear} Matt Jennings. All rights reserved.`)
  ).toBeVisible();
}
