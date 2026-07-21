const BasePage = require('./base.page');
const locators = require('../locators/example.locators');

class ExamplePage extends BasePage {
  constructor(page) {
    super(page);
    this.url = locators.url;
    this.heading = locators.heading;
  }

  async goto() {
    await super.goto(this.url);
  }

  async getHeading() {
    return await this.getText(this.heading);
  }
}

module.exports = ExamplePage;
