import 'dotenv/config';
import { PDFParse } from 'pdf-parse';
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

export async function goToPortfolioPage(page: Page, expect: Expect) {
  await page.getByRole('link', { name: 'Weekly Meetings Block' }).click();
  await expect(page).toHaveURL(
    `${process.env.HOME_URL}portfolio-feed/weekly-meetings-block-wordpress-plugin-using-react`
  );
}

export async function goToResumePageViewPDFResume(page: Page, expect: Expect) {
  await page.getByRole('link', { name: 'Resume', exact: true }).click();
  const pdfLink = page.getByRole('link', { name: 'PDF' }).first();
  const pdfURL = await pdfLink.getAttribute('href');
  expect(pdfURL).not.toBeNull();

  const expectedFilename =
    'resume_front-end-software-engineer_matt-jennings.pdf';
  expect(new URL(pdfURL!, page.url()).pathname).toMatch(
    new RegExp(`${expectedFilename.replaceAll('.', '\\.')}$`)
  );

  const response = await page.request.get(
    new URL(pdfURL!, page.url()).toString()
  );

  expect(response.ok()).toBeTruthy();
  expect(response.headers()['content-type']).toContain('application/pdf');

  const pdfBuffer = await response.body();
  const parser = new PDFParse({ data: pdfBuffer });

  try {
    const result = await parser.getText();
    const text = result.text.replace(/\s+/g, ' ');
    expect(text).toContain('Matt Jennings');
    expect(text).toContain('Sleep Doctor');
  } finally {
    await parser.destroy();
  }
}
