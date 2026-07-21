const { test, expect } = require('@playwright/test');
const Guru99Page = require('../pages/guru99.page');

test.describe('Guru99 Demo Site - Test Cases', () => {
  let guru99Page;

  test.beforeEach(async ({ page }) => {
    guru99Page = new Guru99Page(page);
  });

  test('should navigate to Guru99 demo site and verify page loads', async ({ page }) => {
    await guru99Page.goto();
    const currentUrl = await guru99Page.getCurrentUrl();
    expect(currentUrl).toContain('guru99');
    const pageTitle = await guru99Page.getPageTitle();
    expect(pageTitle).toBeDefined();
    expect(pageTitle.length).toBeGreaterThan(0);
    const content = await guru99Page.getPageContent();
    expect(content.length).toBeGreaterThan(0);
  });

  test('should verify Guru99 homepage elements are visible', async ({ page }) => {
    await guru99Page.goto();
    const bodyContent = page.locator('body');
    await expect(bodyContent).toBeVisible();
    const mainContent = page.locator('main, [role="main"], .container, .content').first();
    const isMainVisible = await mainContent.isVisible().catch(() => false);
    const pageTitle = await guru99Page.getPageTitle();
    expect(pageTitle).toBeDefined();
  });

  test('should check for common Guru99 demo elements', async ({ page }) => {
    await guru99Page.goto();
    await page.waitForLoadState('networkidle');
    const pageHasLinks = await page.locator('a').count();
    expect(pageHasLinks).toBeGreaterThan(0);
    const pageTitle = await guru99Page.getPageTitle();
    expect(pageTitle.toLowerCase()).not.toContain('error');
  });

  test('should verify page navigation and response time', async ({ page }) => {
    const startTime = Date.now();
    await guru99Page.goto();
    const endTime = Date.now();
    const loadTime = endTime - startTime;
    expect(loadTime).toBeLessThan(30000);
    const currentUrl = await guru99Page.getCurrentUrl();
    expect(currentUrl).toContain('guru99');
  });
});
