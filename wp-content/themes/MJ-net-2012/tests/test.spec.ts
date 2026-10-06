import 'dotenv/config';
import { test, expect } from '@playwright/test';
import {
  goToHomepage,
  goToPortfolioPage,
  selectReactFromDropdown
} from './helpers/navigation';
import { viewFooterText } from './helpers/visibility';
import { a11yTest } from './helpers/accessibility';

test('homepage has footer copyright', async ({ page }) => {
  await goToHomepage(page);
  await viewFooterText(page, expect);
});

test('homepage passes accessibility tests', async ({ page }) => {
  await goToHomepage(page);
  await a11yTest(page, expect);
});

test('homepage select REACT from drop-down & go to portfolio page', async ({
  page
}) => {
  await goToHomepage(page);
  await selectReactFromDropdown(page, expect);
  await goToPortfolioPage(page, expect);
  await viewFooterText(page, expect);
});

test('from homepage download PDF resume', async ({ page }) => {
  await goToHomepage(page);

  await page.getByRole('link', { name: 'Resume', exact: true }).click();

  await viewFooterText(page, expect);

  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('link', { name: 'PDF' }).first().click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe(
    'resume_front-end-software-engineer_matt-jennings.pdf'
  );
});
