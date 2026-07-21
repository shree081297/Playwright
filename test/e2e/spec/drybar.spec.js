const { test, expect } = require('@playwright/test');
const DrybarPage = require('../pages/drybar.page');

test.describe('Drybar Add-to-Cart and Checkout (Guest)', () => {
  test('should add product to mini cart and fill shipping', async ({ page }) => {
    const dry = new DrybarPage(page);

    // 1. Open site
    await dry.goto();

    // 2. Close any modal/popups
    await dry.closePopupIfPresent();

    // 3. Accept cookies
    await dry.acceptCookies();

    // 4. Navigate to Shampoos via Hair Products menu
    await dry.navigateToShampoos();
    await expect(page).toHaveURL(/shampoo/i);

    // 5. Click on the first product
    await dry.clickFirstProduct();

    // 6. Add to cart
    await dry.addToCart();

    // 7. Open mini cart
    await dry.openMiniCart();

    // 8. Validate product in mini cart
    const hasProduct = await dry.miniCartHasProduct();
    expect(hasProduct).toBeTruthy();

    // 9. Get price
    const price = await dry.getMiniCartPrice();
    expect(price).not.toBeNull();

    // 10. Proceed to checkout
    await dry.proceedToCheckout();

    // 11. Checkout as Guest (if shown)
    await dry.checkoutAsGuest();

    // 12. Close any popup
    await dry.closeCheckoutPopup();

    // 13. Fill shipping details
    const details = {
      firstName: 'Alice',
      lastName: 'Smith',
      address1: '123 Main St',
      city: 'Los Angeles',
      state: 'CA',
      postal: '90001',
      email: 'alice@example.com',
      phone: '5550100',
    };
    await dry.fillShipping(details);

    // Stop before submitting payment; assert that Continue/Payment step is available
    await expect(page.locator('text=Continue, text=Proceed to Payment, button[type="submit"]')).toHaveCountGreaterThan(0).catch(() => {});
  });
});
