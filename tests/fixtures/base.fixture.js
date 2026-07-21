const { test as base } = require('@playwright/test');

exports.test = base.extend({
  // Add custom fixtures here
  // Example:
  // api: async ({ }, use) => {
  //   const api = new APIClient();
  //   await use(api);
  //   await api.cleanup();
  // },
});

exports.expect = require('@playwright/test').expect;
