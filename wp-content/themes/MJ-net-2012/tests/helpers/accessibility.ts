import type { Page, Expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

export async function a11yTest(page: Page, expect: Expect) {
  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
}
