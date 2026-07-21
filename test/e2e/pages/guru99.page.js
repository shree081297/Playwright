const BasePage = require('./base.page');
const locators = require('../locators/guru99.locators');

class Guru99Page extends BasePage {
  constructor(page) {
    super(page);
    this.url = locators.url;
    this.emailInput = locators.emailInput;
    this.passwordInput = locators.passwordInput;
    this.loginButton = locators.loginButton;
    this.homeHeader = locators.homeHeader;
    this.userDropdown = locators.userDropdown;
  }

  async goto() {
    await super.goto(this.url);
  }

  async login(email, password) {
    await this.fill(this.emailInput, email);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
    await this.page.waitForNavigation();
  }

  async getPageHeading() {
    return await this.getText(this.homeHeader);
  }

  async isLogoutVisible() {
    return await this.isVisible(this.userDropdown);
  }

  async getPageTitle() {
    return await this.page.title();
  }

  async getCurrentUrl() {
    return this.page.url();
  }

  async getPageContent() {
    const content = await this.page.content();
    return content;
  }
}

module.exports = Guru99Page;
