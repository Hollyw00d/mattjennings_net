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

const homeURL = process.env.HOME_URL;
const reactSelectedHomeDropdown = `${process.env.HOME_URL}?portfolio=react`;

test(`${homeURL}: homepage has footer copyright`, async ({ page }) => {
  await goToHomepage(page, homeURL);
  await viewFooterText(page, expect);
});

test('homepage passes accessibility tests', async ({ page }) => {
  await goToHomepage(page, homeURL);
  await a11yTest(page, expect);
});

test(`homepage select REACT from drop-down & go to portfolio page: ${reactSelectedHomeDropdown}`, async ({
  page
}) => {
  await goToHomepage(page, homeURL);
  await selectReactFromDropdown(page, expect, reactSelectedHomeDropdown);
  await goToPortfolioPage(page, expect);
  await viewFooterText(page, expect);
});

test(`portfolio page accessiblity test: ${process.env.HOME_URL}portfolio-feed/weekly-meetings-block-wordpress-plugin-using-react`, async ({
  page
}) => {
  await goToHomepage(page, homeURL);
  await selectReactFromDropdown(page, expect, reactSelectedHomeDropdown);
  await goToPortfolioPage(page, expect);
  await a11yTest(page, expect);
});

test('from homepage download PDF resume on Resume page', async ({ page }) => {
  await goToHomepage(page, homeURL);
  await goToResumePage(page);
  await goToResumePDF(page, expect);
  await viewFooterText(page, expect);
});
