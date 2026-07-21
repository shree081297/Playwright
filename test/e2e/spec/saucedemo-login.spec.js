const { test, expect } = require('@playwright/test');
const SauceDemoPage = require('../pages/saucedemo.page');

test.describe('SauceDemo Login Tests', () => {
  test('should log in using Enter key', async ({ page }) => {
    const sauce = new SauceDemoPage(page);

    await sauce.goto();
    await sauce.loginWithEnter('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  test('should show error for invalid password', async ({ page }) => {
    const sauce = new SauceDemoPage(page);

    await sauce.goto();
    await sauce.login('standard_user', 'wrong_password');

    const errorText = await sauce.getLoginError();
    expect(errorText.toLowerCase()).toContain('username and password do not match');
  });
});
