import 'dotenv/config';
import { test, expect } from '@playwright/test';
import {
  goToHomepage,
  goToPortfolioPage,
  goToResumePage,
  goToResumePDF,
  selectReactFromDropdown
} from './helpers/navigation';
import { viewFooterText } from './helpers/visibility';
import { a11yTest } from './helpers/accessibility';

test(`${process.env.HOME_URL}: homepage has footer copyright`, async ({
  page
}) => {
  await goToHomepage(page);
  await viewFooterText(page, expect);
});

test('homepage passes accessibility tests', async ({ page }) => {
  await goToHomepage(page);
  await a11yTest(page, expect);
});

test(`homepage select REACT from drop-down & go to portfolio page: ${process.env.HOME_URL}portfolio-feed/weekly-meetings-block-wordpress-plugin-using-react`, async ({
  page
}) => {
  await goToHomepage(page);
  await selectReactFromDropdown(page, expect);
  await goToPortfolioPage(page, expect);
  await viewFooterText(page, expect);
});

test(`portfolio page accessiblity test: ${process.env.HOME_URL}portfolio-feed/weekly-meetings-block-wordpress-plugin-using-react`, async ({
  page
}) => {
  await goToHomepage(page);
  await selectReactFromDropdown(page, expect);
  await goToPortfolioPage(page, expect);
  await a11yTest(page, expect);
});

test('from homepage download PDF resume on Resume page', async ({ page }) => {
  await goToHomepage(page);
  await goToResumePage(page);
  await goToResumePDF(page, expect);
  await viewFooterText(page, expect);
});
