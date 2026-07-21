class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goto(url) {
    await this.page.goto(url);
  }

  async fill(selector, text) {
    await this.page.fill(selector, text);
  }

  async click(selector) {
    await this.page.click(selector);
  }

  async getText(selector) {
    return await this.page.textContent(selector);
  }

  async isVisible(selector) {
    return await this.page.isVisible(selector);
  }

  async waitForNavigation(action) {
    await Promise.all([this.page.waitForNavigation(), action()]);
  }
}

module.exports = BasePage;
