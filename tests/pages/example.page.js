const BasePage = require('./base.page');

class ExamplePage extends BasePage {
  constructor(page) {
    super(page);
    this.url = 'https://example.com';
    this.heading = 'h1';
  }

  async goto() {
    await super.goto(this.url);
  }

  async getHeading() {
    return await this.getText(this.heading);
  }
}

module.exports = ExamplePage;
