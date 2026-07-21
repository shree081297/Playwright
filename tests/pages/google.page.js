const BasePage = require('./base.page');

class GooglePage extends BasePage {
  constructor(page) {
    super(page);
    this.url = 'https://www.google.com';
    this.searchBox = 'textarea[name="q"]';
    this.searchButton = 'button[aria-label="Google Search"]';
    // Updated selector for first search result link
    this.firstResult = 'a[href*="http"][href*="www"]';
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
    // Wait for search results to load
    await this.page.waitForSelector('div[data-sokoban-container]', { timeout: 5000 }).catch(() => null);
    
    // Get all result links and click the first one
    const resultLinks = await this.page.locator('a[jsname="UWckNb"]').all();
    if (resultLinks.length > 0) {
      await resultLinks[0].click();
    } else {
      // Fallback: click first link in search results
      const firstLink = this.page.locator('a[href*="http"][href*="www"]').first();
      await firstLink.click();
    }
    
    // Wait for navigation to complete
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
