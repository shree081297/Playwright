const { test, expect } = require('@playwright/test');
const SauceDemoPage = require('../pages/saucedemo.page');

test.describe('SauceDemo E2E Flow', () => {
  test('full user scenarios and checkout', async ({ page, browserName }) => {
    const sauce = new SauceDemoPage(page);

    // 1. Open browser
    await sauce.goto();

    // 2. Enter valid username and password and login
    await sauce.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory.html/);

    // 3. Enter invalid username/password and click login (verify error)
    await sauce.goto();
    await sauce.login('invalid_user', 'wrong_password');
    const invalidError = await sauce.getError();
    expect(invalidError.toLowerCase()).toContain('username and password do not match');

    // 4. Enter locked_out_user username and valid password (verify locked out message)
    await sauce.goto();
    await sauce.login('locked_out_user', 'secret_sauce');
    const lockedError = await sauce.getError();
    expect(lockedError.toLowerCase()).toContain('locked out');

    // 5-6. After valid creds lands on inventory page, add Backpack to cart from inventory
    await sauce.goto();
    await sauce.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory.html/);
    await sauce.addBackpackToCart();

    // 7. Click on mini cart located at top right
    await sauce.openCart();

    // 8. Click on checkout button on cart page
    await sauce.clickCheckout();

    // 9. Enter First name, Last name, Zip/Postal code and continue
    await sauce.fillCheckout('John', 'Doe', '12345');

    // 10. Click finish on checkout page
    await sauce.finishOrder();

    // 11. Verify THANK YOU FOR YOUR ORDER message
    const thankYou = await sauce.getThankYouMessage();
    expect(thankYou.trim().toUpperCase()).toContain('THANK YOU FOR YOUR ORDER');
  });
});
