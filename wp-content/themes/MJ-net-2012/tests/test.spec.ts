import 'dotenv/config';
import { test, expect } from '@playwright/test';
import {
  goToHomepage,
  goToPortfolioPage,
  goToResumePage,
  goToResumePDF,
  selectReactFromDropdown,
  goToContactPage,
  goToBlogPage,
  goToBlogPost
} from './helpers/navigation';
import { viewFooterText } from './helpers/visibility';
import { a11yTest } from './helpers/accessibility';

const homeURL = process.env.HOME_URL;
const reactSelectedHomeDropdown = `${process.env.HOME_URL}?portfolio=react`;
const portfolioPage = `${process.env.HOME_URL}portfolio-feed/weekly-meetings-block-wordpress-plugin-using-react`;
const resumePage = `${process.env.HOME_URL}resume`;
const contactPage = `${process.env.HOME_URL}contact`;
const blogPage = `${process.env.HOME_URL}blog`;
const blogPost = `${process.env.HOME_URL}extracting-urls-web-page-chrome-developer-tools`;

test(`homepage has footer copyright: ${homeURL}`, async ({ page }) => {
  await goToHomepage(page, homeURL);
  await viewFooterText(page, expect);
});

test(`homepage passes accessibility tests: ${homeURL}`, async ({ page }) => {
  await goToHomepage(page, homeURL);
  await a11yTest(page, expect);
});

test(`homepage select REACT from drop-down & go to portfolio page: ${portfolioPage}`, async ({
  page
}) => {
  await goToHomepage(page, homeURL);
  await selectReactFromDropdown(page, expect, reactSelectedHomeDropdown);
  await goToPortfolioPage(page, expect, portfolioPage);
  await viewFooterText(page, expect);
});

test(`portfolio page accessiblity test: ${portfolioPage}`, async ({ page }) => {
  await goToHomepage(page, homeURL);
  await selectReactFromDropdown(page, expect, reactSelectedHomeDropdown);
  await goToPortfolioPage(page, expect, portfolioPage);
  await a11yTest(page, expect);
});

test(`from homepage download PDF resume on Resume page: ${resumePage}`, async ({
  page
}) => {
  await goToHomepage(page, homeURL);
  await goToResumePage(page);
  await goToResumePDF(page, expect);
  await viewFooterText(page, expect);
});

test(`Resume page accessibility test: ${resumePage}`, async ({ page }) => {
  await goToHomepage(page, homeURL);
  await goToResumePage(page);
  await a11yTest(page, expect);
});

test(`Contact page has footer copyright: ${contactPage}`, async ({ page }) => {
  await goToHomepage(page, homeURL);
  await goToContactPage(page);
  await viewFooterText(page, expect);
});

test(`Contact page accessibility test: ${contactPage}`, async ({ page }) => {
  await goToHomepage(page, homeURL);
  await goToContactPage(page);
  await a11yTest(page, expect);
});

test(`Blog page has footer copyright: ${blogPage}`, async ({ page }) => {
  await goToHomepage(page, homeURL);
  await goToBlogPage(page);
  await viewFooterText(page, expect);
});

test(`Blog page accessibility test: ${blogPage}`, async ({ page }) => {
  await goToHomepage(page, homeURL);
  await goToBlogPage(page);
  await a11yTest(page, expect);
});

test(`Blog post has footer copyright: ${blogPost}`, async ({ page }) => {
  await goToHomepage(page, homeURL);
  await goToBlogPage(page);
  await goToBlogPost(page);
  await viewFooterText(page, expect);
});

test(`Blog post accessibility test: ${blogPost}`, async ({ page }) => {
  await goToHomepage(page, homeURL);
  await goToBlogPage(page);
  await goToBlogPost(page);
  await a11yTest(page, expect);
});
