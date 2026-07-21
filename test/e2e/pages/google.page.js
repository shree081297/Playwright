const BasePage = require('./base.page');
const locators = require('../locators/google.locators');

class GooglePage extends BasePage {
  constructor(page) {
    super(page);
    this.url = locators.url;
    this.searchBox = locators.searchBox;
    this.searchButton = locators.searchButton;
    this.firstResult = locators.firstResult;
  }

  async goto() {
    await super.goto(this.url);
  }

  async search(query) {
    await this.fill(this.searchBox, query);
    await this.page.keyboard.press('Enter');
    await this.page.waitForNavigation();
  }

  async clickFirstResult() {
    await this.page.waitForSelector('div[data-sokoban-container]', { timeout: 5000 }).catch(() => null);
    const resultLinks = await this.page.locator(locators.resultLink).all();
    if (resultLinks.length > 0) {
      await resultLinks[0].click();
    } else {
      const firstLink = this.page.locator('a[href*="http"][href*="www"]').first();
      await firstLink.click();
    }
    await this.page.waitForLoadState('networkidle').catch(() => null);
  }

  async getPageUrl() {
    return this.page.url();
  }

  async getPageTitle() {
    return await this.page.title();
  }
}

module.exports = GooglePage;
