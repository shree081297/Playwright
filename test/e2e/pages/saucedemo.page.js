const BasePage = require('./base.page');
const locators = require('../locators/saucedemo.locators');

class SauceDemoPage extends BasePage {
  constructor(page) {
    super(page);
    this.url = locators.url;
    this.username = locators.username;
    this.password = locators.password;
    this.loginButton = locators.loginButton;
    this.errorSelector = locators.errorSelector;
    this.cartLink = locators.cartLink;
    this.checkoutButton = locators.checkoutButton;
    this.firstName = locators.firstName;
    this.lastName = locators.lastName;
    this.postalCode = locators.postalCode;
    this.continueButton = locators.continueButton;
    this.finishButton = locators.finishButton;
    this.completeHeader = locators.completeHeader;
    this.addBackpackSelector = locators.addBackpack;
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
    await this.page.waitForSelector(this.addBackpackSelector, { timeout: 10000 });
    await this.page.click(this.addBackpackSelector);
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
