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
    // Verify Chrome browser is opened
    expect(browserName).toBe('chromium');

    // Navigate to Google
    await googlePage.goto();
    expect(page.url()).toContain('google.com');

    // Search for "playwright"
    await googlePage.search('playwright');
    
    // Wait for search results to load
    await page.waitForSelector('div[data-sokoban-container]', { timeout: 10000 }).catch(() => null);
    
    // Verify we're on search results or have results loaded
    const currentUrl = page.url();
    expect(currentUrl).toContain('google.com');
    
    // Verify search results are visible
    const hasResults = await page.locator('a[jsname="UWckNb"]').count();
    expect(hasResults).toBeGreaterThan(0);

    // Click on the first result
    await googlePage.clickFirstResult();

    // Verify landing on correct page (should be Playwright official site or related)
    const finalUrl = await googlePage.getPageUrl();
    const finalTitle = await googlePage.getPageTitle();
    
    // Assert we're on a page related to Playwright
    expect(finalUrl.length).toBeGreaterThan(0);
    expect(finalTitle).toBeDefined();
    
    // Additional verification - check that we're not on Google search results
    expect(finalUrl).not.toContain('google.com/search');
    expect(finalTitle.toLowerCase()).toContain('playwright');
  });
});
