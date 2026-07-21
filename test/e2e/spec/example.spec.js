const { test, expect } = require('@playwright/test');
const ExamplePage = require('../pages/example.page');

test.describe('Example Page Tests', () => {
  let examplePage;

  test.beforeEach(async ({ page }) => {
    examplePage = new ExamplePage(page);
    await examplePage.goto();
  });

  test('should display the page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Example Domain/);
  });

  test('should have visible heading', async () => {
    const isHeadingVisible = await examplePage.isVisible('h1');
    expect(isHeadingVisible).toBe(true);
  });

  test('should display correct heading text', async () => {
    const heading = await examplePage.getHeading();
    expect(heading).toBe('Example Domain');
  });
});
