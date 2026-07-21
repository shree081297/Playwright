const BasePage = require('./base.page');
const locators = require('../locators/drybar.locators');

class DrybarPage extends BasePage {
  constructor(page) {
    super(page);
    this.loc = locators;
  }

  async goto() {
    await super.goto(this.loc.url);
  }

  async closePopupIfPresent() {
    for (const sel of this.loc.popupCloseSelectors) {
      const el = this.page.locator(sel);
      if (await el.count() > 0) {
        try { await el.first().click({ force: true }); } catch (e) { /* ignore */ }
      }
    }
  }

  async acceptCookies() {
    const sel = this.loc.cookieAccept;
    const el = this.page.locator(sel);
    if (await el.count() > 0) {
      await el.first().click().catch(() => null);
    }
  }

  async navigateToShampoos() {
    // Directly navigate to the shampoos category page to avoid menu hover flakiness.
    await this.page.goto('https://www.drybar.com/hair-care-products/shampoos', { waitUntil: 'domcontentloaded' }).catch(() => null);
    await this.page.waitForSelector(this.loc.productList, { timeout: 15000 }).catch(() => null);
    await this.page.waitForLoadState('networkidle').catch(() => null);
  }

  ensureActivePage() {
    try {
      if (this.page && this.page.context) {
        const pages = this.page.context().pages();
        if (pages && pages.length > 0) {
          const last = pages[pages.length - 1];
          if (last && !last.isClosed()) {
            this.page = last;
          }
        }
      }
    } catch (e) {
      // ignore
    }
    return this.page;
  }

  async validateShampoosPage() {
    await this.page.waitForLoadState('networkidle');
    return this.page.url();
  }

  async clickFirstProduct() {
    const page = this.ensureActivePage();
    if (!page || (page.isClosed && page.isClosed())) {
      console.log('DEBUG: clickFirstProduct no active page');
      return;
    }
    // Try product link patterns
    const links = page.locator(this.loc.productLink);
    if (await links.count() === 0) {
      // fallback: click first item in productList
      const items = page.locator(this.loc.productList + ' a');
      if (await items.count() > 0) {
        await items.first().click();
        return;
      }
      return;
    }
    await links.first().click();
    await page.waitForLoadState('networkidle');
  }

  async addToCart() {
    this.ensureActivePage();
    // Try several add-to-cart selectors
    const sel = this.loc.addToCartBtn;
    const btn = this.page.locator(sel);
    if (await btn.count() > 0) {
      await btn.first().click().catch(() => null);
    } else {
      // try button with text
      await this.page.click('text=Add to Cart').catch(() => null);
    }
    await this.page.waitForTimeout(1000);
  }

  async openMiniCart() {
    this.ensureActivePage();
    const sel = this.loc.miniCart;
    await this.page.click(sel).catch(() => null);
    await this.page.waitForTimeout(500);
  }

  async miniCartHasProduct() {
    const sel = this.loc.miniCartItemSelector;
    const items = this.page.locator(sel);
    return (await items.count()) > 0;
  }

  async getMiniCartPrice() {
    const sel = this.loc.miniCartPriceSelector;
    const el = this.page.locator(sel).first();
    if (await el.count() > 0) return (await el.textContent()).trim();
    return null;
  }

  async proceedToCheckout() {
    await this.page.click(this.loc.proceedToCheckoutBtn).catch(() => null);
    await this.page.waitForLoadState('networkidle');
  }

  async checkoutAsGuest() {
    await this.page.click(this.loc.checkoutAsGuestBtn).catch(() => null);
    await this.page.waitForTimeout(500);
  }

  async closeCheckoutPopup() {
    await this.page.locator(this.loc.checkoutPopupClose).first().click().catch(() => null);
  }

  async fillShipping(details) {
    await this.page.fill(this.loc.shippingFirstName, details.firstName).catch(() => null);
    await this.page.fill(this.loc.shippingLastName, details.lastName).catch(() => null);
    await this.page.fill(this.loc.shippingAddress1, details.address1).catch(() => null);
    await this.page.fill(this.loc.shippingCity, details.city).catch(() => null);
    // State may be select
    try {
      await this.page.selectOption(this.loc.shippingState, { label: details.state }).catch(() => null);
    } catch (e) {
      await this.page.fill(this.loc.shippingState, details.state).catch(() => null);
    }
    await this.page.fill(this.loc.shippingPostal, details.postal).catch(() => null);
    await this.page.fill(this.loc.shippingEmail, details.email).catch(() => null);
    await this.page.fill(this.loc.shippingPhone, details.phone).catch(() => null);
  }
}

module.exports = DrybarPage;
