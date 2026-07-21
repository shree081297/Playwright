const BasePage = require('./base.page');

class SauceDemoPage extends BasePage {
  constructor(page) {
    super(page);
    this.url = 'https://www.saucedemo.com/v1/index.html';
    this.username = '#user-name';
    this.password = '#password';
    this.loginButton = '#login-button';
    this.errorSelector = '[data-test="error"]';
    this.cartLink = '.shopping_cart_link';
    this.checkoutButton = '[data-test="checkout"]';
    this.firstName = '[data-test="firstName"]';
    this.lastName = '[data-test="lastName"]';
    this.postalCode = '[data-test="postalCode"]';
    this.continueButton = '[data-test="continue"]';
    this.finishButton = '[data-test="finish"]';
    this.completeHeader = '.complete-header';
  }

  async goto() {
    await super.goto(this.url);
  }

  async login(user, pass) {
    await this.page.fill(this.username, user);
    await this.page.fill(this.password, pass);
    await this.page.click(this.loginButton);
  }

  async getError() {
    return await this.page.locator(this.errorSelector).textContent().catch(() => '');
  }

  async openProduct(name = 'Sauce Labs Backpack') {
    // Click product by its visible name
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => null),
      this.page.click(`text=${name}`),
    ]);
  }

  async addBackpackToCart() {
    // Known add-to-cart id for the Backpack
    await this.page.waitForSelector('[data-test="add-to-cart-sauce-labs-backpack"]', { timeout: 10000 });
    await this.page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  }

  async openCart() {
    await this.page.click(this.cartLink);
  }

  async clickCheckout() {
    await this.page.click(this.checkoutButton);
  }

  async fillCheckout(first, last, zip) {
    await this.page.fill(this.firstName, first);
    await this.page.fill(this.lastName, last);
    await this.page.fill(this.postalCode, zip);
    await this.page.click(this.continueButton);
  }

  async finishOrder() {
    await this.page.click(this.finishButton);
  }

  async getThankYouMessage() {
    return await this.page.locator(this.completeHeader).textContent().catch(() => '');
  }
}

module.exports = SauceDemoPage;
