const BasePage = require('./base.page');

class Guru99Page extends BasePage {
  constructor(page) {
    super(page);
    this.url = 'https://demo.guru99.com/';
    this.emailInput = 'input[name="email"]';
    this.passwordInput = 'input[name="password"]';
    this.loginButton = 'button[type="submit"]';
    this.homeHeader = 'h1';
    this.userDropdown = 'a[href*="logout"]';
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
