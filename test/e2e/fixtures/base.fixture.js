const { test as base } = require('@playwright/test');

exports.test = base.extend({
  // Add custom fixtures here
});

exports.expect = require('@playwright/test').expect;
