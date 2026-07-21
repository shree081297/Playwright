const { test, expect } = require('@playwright/test');
const GooglePage = require('../pages/google.page');

test.describe('Google Search - Playwright', () => {
  let googlePage;

  test.beforeEach(async ({ page, browserName }) => {
    // Verify Chrome browser is opened
    expect(browserName).toBe('chromium');
    googlePage = new GooglePage(page);
  });

  test('should open Chrome browser successfully', async ({ page, browserName }) => {
    expect(browserName).toBe('chromium');
    expect(page).toBeDefined();
  });

  test('should search for Playwright on Google and verify landing page', async ({ page, browserName }) => {
    expect(browserName).toBe('chromium');
    await googlePage.goto();
    expect(page.url()).toContain('google.com');
    await googlePage.search('playwright');
    await page.waitForSelector('div[data-sokoban-container]', { timeout: 10000 }).catch(() => null);
    const currentUrl = page.url();
    expect(currentUrl).toContain('google.com');
    const hasResults = await page.locator('a[jsname="UWckNb"]').count();
    expect(hasResults).toBeGreaterThan(0);
    await googlePage.clickFirstResult();
    const finalUrl = await googlePage.getPageUrl();
    const finalTitle = await googlePage.getPageTitle();
    expect(finalUrl.length).toBeGreaterThan(0);
    expect(finalTitle).toBeDefined();
    expect(finalUrl).not.toContain('google.com/search');
    expect(finalTitle.toLowerCase()).toContain('playwright');
  });
});
