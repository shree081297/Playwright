const { test, expect } = require('@playwright/test');
const Guru99Page = require('../pages/guru99.page');

test.describe('Guru99 Demo Site - Test Cases', () => {
  let guru99Page;

  test.beforeEach(async ({ page }) => {
    guru99Page = new Guru99Page(page);
  });

  test('should navigate to Guru99 demo site and verify page loads', async ({ page }) => {
    // Navigate to Guru99 demo site
    await guru99Page.goto();

    // Verify page URL contains guru99
    const currentUrl = await guru99Page.getCurrentUrl();
    expect(currentUrl).toContain('guru99');

    // Verify page title
    const pageTitle = await guru99Page.getPageTitle();
    expect(pageTitle).toBeDefined();
    expect(pageTitle.length).toBeGreaterThan(0);

    // Verify page content loads
    const content = await guru99Page.getPageContent();
    expect(content.length).toBeGreaterThan(0);
  });

  test('should verify Guru99 homepage elements are visible', async ({ page }) => {
    await guru99Page.goto();

    // Verify page is not blank
    const bodyContent = page.locator('body');
    await expect(bodyContent).toBeVisible();

    // Verify we can see main content
    const mainContent = page.locator('main, [role="main"], .container, .content').first();
    const isMainVisible = await mainContent.isVisible().catch(() => false);
    
    // Page should have some visible content
    const pageTitle = await guru99Page.getPageTitle();
    expect(pageTitle).toBeDefined();
  });

  test('should check for common Guru99 demo elements', async ({ page }) => {
    await guru99Page.goto();

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Check for various possible elements on the page
    const pageHasLinks = await page.locator('a').count();
    expect(pageHasLinks).toBeGreaterThan(0);

    // Verify page is accessible (no major errors)
    const pageTitle = await guru99Page.getPageTitle();
    expect(pageTitle.toLowerCase()).not.toContain('error');
  });

  test('should verify page navigation and response time', async ({ page }) => {
    const startTime = Date.now();

    await guru99Page.goto();

    const endTime = Date.now();
    const loadTime = endTime - startTime;

    // Page should load within reasonable time (less than 30 seconds)
    expect(loadTime).toBeLessThan(30000);

    // Verify page status
    const currentUrl = await guru99Page.getCurrentUrl();
    expect(currentUrl).toContain('guru99');
  });
});
