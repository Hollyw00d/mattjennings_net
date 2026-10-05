import type { Page, Expect } from '@playwright/test';

export async function viewFooterText(page: Page, expect: Expect) {
  const footer = page.getByRole('contentinfo');
  await expect(
    footer.getByText('© 2026 Matt Jennings. All rights reserved.')
  ).toBeVisible();
}
