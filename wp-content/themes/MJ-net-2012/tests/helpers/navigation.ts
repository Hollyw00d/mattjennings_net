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

export async function goToResumePage(page: Page) {
  await page.getByRole('link', { name: 'Resume', exact: true }).click();
}

export async function goToResumePDF(page: Page, expect: Expect) {
  await page.getByRole('link', { name: 'Resume', exact: true }).click();
  const pdfLink = page.getByRole('link', { name: 'PDF' }).first();
  const pdfURL = await pdfLink.getAttribute('href');
  expect(pdfURL).not.toBeNull();

  const expectedFilename =
    'resume_front-end-software-engineer_matt-jennings.pdf';

  // Convert the PDF URL into a URL object using the current page as the base.
  // The ! tells TypeScript to treat pdfURL as non-null.
  // .pathname extracts the path portion of the URL.
  // replaceAll() escapes periods so they match literal dots in a regex.
  // The $ ensures the filename appears at the end of the URL path.
  // toMatch() verifies that the path ends with the expected filename.
  expect(new URL(pdfURL!, page.url()).pathname).toMatch(
    new RegExp(`${expectedFilename.replaceAll('.', '\\.')}$`)
  );

  // Make an HTTP GET request directly to the PDF URL.
  // new URL() resolves relative URLs against the current page URL.
  // .toString() converts the URL object into a complete URL string.
  // This avoids relying on browser-specific PDF download behavior.
  const response = await page.request.get(
    new URL(pdfURL!, page.url()).toString()
  );

  // Verify the HTTP response was successful (status 200–299).
  expect(response.ok()).toBeTruthy();

  // Verify the server identifies the returned content as a PDF.
  expect(response.headers()['content-type']).toContain('application/pdf');
  // Read the PDF response body into a Node.js Buffer containing binary data.
  const pdfBuffer = await response.body();
  // Create a pdf-parse instance using the PDF's binary data.
  const parser = new PDFParse({ data: pdfBuffer });

  // Use try/finally to ensure the parser is cleaned up even if a test fails.
  try {
    // Extract text and document information from the PDF.
    const result = await parser.getText();
    // Replace consecutive whitespace (spaces, tabs, newlines) with one space.
    // \s matches whitespace, + matches one or more, and g means globally.
    const text = result.text.replace(/\s+/g, ' ');
    expect(text).toContain('Matt Jennings');
    expect(text).toContain('Sleep Doctor');
  } finally {
    // Release resources used by the PDF parser, even if an assertion fails.
    await parser.destroy();
  }
}
